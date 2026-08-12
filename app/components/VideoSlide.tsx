import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import type { PortfolioVideo } from '../types/portfolio'
import { embedUrl, thumbnailCandidates } from '../utils/youtube'

/** YouTube `playerState` values we care about. */
const STATE_ENDED = 0
const STATE_PLAYING = 1
const STATE_PAUSED = 2
/** Playhead drift, in seconds, that can only be explained by a scrub. */
const SEEK_TOLERANCE = 2

interface VideoSlideProps {
  video: PortfolioVideo
  /** True once the slide has entered the viewport at least once (lazy load). */
  isLoaded: boolean
  /** The centred slide — the only one that becomes a real player. */
  isActive: boolean
  /** Whether this player should start muted, inherited from the row. */
  startMuted: boolean
  /** Reports the player's mute state so the row can carry it to the next video. */
  onMutedChange: (muted: boolean) => void
  /** The viewer touched YouTube's own controls. */
  onPlayerInteract: () => void
  /** Bring this slide to the centre. */
  onFocusSlide: () => void
}

export function VideoSlide({
  video,
  isLoaded,
  isActive,
  startMuted,
  onMutedChange,
  onPlayerInteract,
  onFocusSlide,
}: VideoSlideProps) {
  const isPortrait = video.orientation === 'portrait'

  const candidates = useMemo(
    () => thumbnailCandidates(video.id, isPortrait),
    [video.id, isPortrait],
  )
  const [candidate, setCandidate] = useState(0)
  const [thumbLoaded, setThumbLoaded] = useState(false)
  const [frameLoaded, setFrameLoaded] = useState(false)

  const frameRef = useRef<HTMLIFrameElement>(null)
  const startMutedRef = useRef(startMuted)
  startMutedRef.current = startMuted
  const onMutedChangeRef = useRef(onMutedChange)
  onMutedChangeRef.current = onMutedChange
  const onPlayerInteractRef = useRef(onPlayerInteract)
  onPlayerInteractRef.current = onPlayerInteract

  // The src is fixed the moment the slide becomes active, so the row's mute
  // preference can change later without reloading the player.
  const [src, setSrc] = useState<string | null>(null)
  useEffect(() => {
    setFrameLoaded(false)
    setSrc(isActive ? embedUrl(video.id, startMutedRef.current) : null)
  }, [isActive, video.id])

  /**
   * IFrame API channel. Clicks inside the player never reach the page, so the
   * only way to notice someone using YouTube's controls is to watch the state
   * it streams back: a pause, a mute/volume change, or a playhead jump that no
   * amount of ordinary playback could explain.
   */
  useEffect(() => {
    if (!src) return
    let acknowledged = false
    const launchedMuted = startMutedRef.current
    const tracked = {
      state: -99,
      started: false,
      muted: launchedMuted,
      volume: -1,
      audible: !launchedMuted,
      time: -1,
      stamp: 0,
    }

    /**
     * Audibility is the real signal, and it can arrive as either a mute flag
     * or a volume change depending on which control was used. Only trust it
     * once playback has started: a blocked unmuted autoplay gets force-muted
     * by the browser, and that must not wipe the row's preference.
     */
    const syncAudible = () => {
      const audible = !tracked.muted && tracked.volume !== 0
      if (!tracked.started || audible === tracked.audible) return
      tracked.audible = audible
      onMutedChangeRef.current(!audible)
      onPlayerInteractRef.current()
    }

    const post = (func: string, args: unknown[] = []) =>
      frameRef.current?.contentWindow?.postMessage(
        JSON.stringify({ event: 'command', func, args }),
        '*',
      )

    const onMessage = (event: MessageEvent) => {
      if (!String(event.origin).includes('youtube')) return
      if (event.source !== frameRef.current?.contentWindow) return
      acknowledged = true

      try {
        const payload =
          typeof event.data === 'string' ? JSON.parse(event.data) : event.data
        const info = payload?.info
        if (!info) return

        // The player re-reports its state constantly; only transitions matter.
        if (typeof info.playerState === 'number' && info.playerState !== tracked.state) {
          const state = info.playerState
          tracked.state = state
          // Buffering and pauses stall the playhead, so re-baseline the seek
          // check on every transition rather than reading the stall as a jump.
          tracked.time = -1

          if (state === STATE_PLAYING) {
            const firstPlay = !tracked.started
            tracked.started = true
            // The URL's `mute=0` is a request, not a guarantee — make it stick.
            if (firstPlay && !launchedMuted) post('unMute')
          } else if (state === STATE_PAUSED && tracked.started) {
            onPlayerInteractRef.current()
          } else if (state === STATE_ENDED) {
            post('seekTo', [0, true])
            post('playVideo')
          }
        }

        if (typeof info.muted === 'boolean' && info.muted !== tracked.muted) {
          tracked.muted = info.muted
          syncAudible()
        }

        if (typeof info.volume === 'number' && info.volume !== tracked.volume) {
          const previous = tracked.volume
          tracked.volume = info.volume
          syncAudible()
          if (tracked.started && previous >= 0 && Math.abs(info.volume - previous) > 1) {
            onPlayerInteractRef.current()
          }
        }

        if (typeof info.currentTime === 'number') {
          const now = Date.now()
          if (tracked.state === STATE_PLAYING && tracked.time >= 0) {
            const expected = tracked.time + (now - tracked.stamp) / 1000
            if (Math.abs(info.currentTime - expected) > SEEK_TOLERANCE) {
              onPlayerInteractRef.current()
            }
          }
          tracked.time = info.currentTime
          tracked.stamp = now
        }
      } catch {
        /* non-JSON chatter from the player, ignore */
      }
    }

    window.addEventListener('message', onMessage)
    const intervalId = window.setInterval(() => {
      if (acknowledged) return
      frameRef.current?.contentWindow?.postMessage(
        JSON.stringify({ event: 'listening', id: video.id }),
        '*',
      )
    }, 300)

    return () => {
      window.removeEventListener('message', onMessage)
      window.clearInterval(intervalId)
    }
  }, [src, video.id])

  const nextCandidate = useCallback(() => {
    setCandidate((index) => (index < candidates.length - 1 ? index + 1 : index))
  }, [candidates.length])

  /**
   * Missing sizes don't always 404 — YouTube happily serves a 120x90 grey
   * placeholder with a 200, so the only reliable tell is the decoded size.
   */
  const handleThumbLoad = useCallback(
    (event: React.SyntheticEvent<HTMLImageElement>) => {
      const image = event.currentTarget
      const isPlaceholder = image.naturalWidth <= 120 && image.naturalHeight <= 90
      if (isPlaceholder && candidate < candidates.length - 1) {
        nextCandidate()
        return
      }
      setThumbLoaded(true)
    },
    [candidate, candidates.length, nextCandidate],
  )

  return (
    <div className="embla-slide">
      <div
        className={`embla-slide-inner group relative overflow-hidden rounded-xl border bg-black shadow-[0_10px_40px_-12px_rgba(0,0,0,0.9)] transition-colors duration-300 ${
          isActive ? 'border-highlight/60' : 'border-white/10'
        }`}
        style={{ aspectRatio: isPortrait ? '9 / 16' : '16 / 9' }}
      >
        {src ? (
          <iframe
            ref={frameRef}
            className="absolute inset-0 h-full w-full border-0"
            src={src}
            title={video.title}
            onLoad={() => setFrameLoaded(true)}
            allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
            allowFullScreen
          />
        ) : null}

        {/* Poster frame — lazy loaded, and only until the player takes over */}
        {isLoaded ? (
          <img
            src={candidates[candidate]}
            alt=""
            aria-hidden="true"
            loading="lazy"
            decoding="async"
            onLoad={handleThumbLoad}
            onError={nextCandidate}
            className={`pointer-events-none absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${
              thumbLoaded && !frameLoaded ? 'opacity-100' : 'opacity-0'
            }`}
          />
        ) : null}

        {!thumbLoaded && !frameLoaded ? (
          <div className="pointer-events-none absolute inset-0 animate-pulse bg-white/5" />
        ) : null}

        {/* Inactive slides are a single click target that centres them */}
        {isActive ? null : (
          <button
            type="button"
            onClick={onFocusSlide}
            aria-label={`Show ${video.title}`}
            className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent outline-none ring-inset ring-highlighter-2nd transition-opacity duration-300 focus-visible:ring-2"
          >
            <span className="absolute left-3 top-3 font-barlow-condensed text-xs uppercase tracking-[0.2em] text-foreground [text-shadow:0_1px_6px_rgba(0,0,0,0.9)]">
              {video.title}
            </span>
          </button>
        )}
      </div>
    </div>
  )
}
