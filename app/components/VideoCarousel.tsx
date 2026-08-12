import React, { useCallback, useEffect, useRef, useState } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import AutoScroll from 'embla-carousel-auto-scroll'
import type { EmblaCarouselType, EmblaEventType } from 'embla-carousel'
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react'
import type { PortfolioVideo } from '../types/portfolio'
import { VideoSlide } from './VideoSlide'
import { clamp } from '../utils/youtube'

/** How aggressively slides away from the centre fade out. */
const TWEEN_FACTOR_BASE = 0.3
const MIN_OPACITY = 0.25

interface VideoCarouselProps {
  videos: PortfolioVideo[]
  label: string
}

export function VideoCarousel({ videos, label }: VideoCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: 'center',
      dragFree: false,
      skipSnaps: false,
      containScroll: false,
    },
    [
      AutoScroll({
        playOnInit: true,
        speed: 0.6,
        // Hovering never touches the marquee — only real interaction does,
        // and once it stops it stays stopped until explicitly resumed.
        stopOnInteraction: true,
        stopOnMouseEnter: false,
        stopOnFocusIn: true,
      }),
    ],
  )

  const tweenFactor = useRef(0)
  const tweenNodes = useRef<HTMLElement[]>([])
  const [loaded, setLoaded] = useState<boolean[]>(() => videos.map(() => false))
  const [selectedIndex, setSelectedIndex] = useState(0)
  /** Sticky per row: once you unmute one video, the next starts unmuted too. */
  const [rowUnmuted, setRowUnmuted] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)

  const setTweenNodes = useCallback((api: EmblaCarouselType) => {
    tweenNodes.current = api
      .slideNodes()
      .map((slideNode) => slideNode.querySelector('.embla-slide-inner') as HTMLElement)
  }, [])

  const setTweenFactor = useCallback((api: EmblaCarouselType) => {
    tweenFactor.current = TWEEN_FACTOR_BASE * api.scrollSnapList().length
  }, [])

  const tweenOpacity = useCallback(
    (api: EmblaCarouselType, eventName?: EmblaEventType) => {
      const engine = api.internalEngine()
      const scrollProgress = api.scrollProgress()
      const slidesInView = api.slidesInView()
      const isScrollEvent = eventName === 'scroll'

      api.scrollSnapList().forEach((scrollSnap, snapIndex) => {
        let diffToTarget = scrollSnap - scrollProgress
        const slidesInSnap = engine.slideRegistry[snapIndex]

        slidesInSnap.forEach((slideIndex) => {
          if (isScrollEvent && !slidesInView.includes(slideIndex)) return

          if (engine.options.loop) {
            engine.slideLooper.loopPoints.forEach((loopItem) => {
              const target = loopItem.target()
              if (slideIndex === loopItem.index && target !== 0) {
                const sign = Math.sign(target)
                if (sign === -1) diffToTarget = scrollSnap - (1 + scrollProgress)
                if (sign === 1) diffToTarget = scrollSnap + (1 - scrollProgress)
              }
            })
          }

          const tweenValue = 1 - Math.abs(diffToTarget * tweenFactor.current)
          const node = tweenNodes.current[slideIndex]
          if (node) node.style.opacity = clamp(tweenValue, MIN_OPACITY, 1).toFixed(3)
        })
      })
    },
    [],
  )

  /** Lazy load: a slide keeps its poster once it has entered the viewport. */
  const updateLoaded = useCallback((api: EmblaCarouselType) => {
    const inView = api.slidesInView()
    setLoaded((previous) => {
      let changed = false
      const next = [...previous]
      inView.forEach((index) => {
        if (!next[index]) {
          next[index] = true
          changed = true
        }
      })
      return changed ? next : previous
    })
  }, [])

  const onSelect = useCallback((api: EmblaCarouselType) => {
    setSelectedIndex(api.selectedScrollSnap())
  }, [])

  useEffect(() => {
    if (!emblaApi) return

    setTweenNodes(emblaApi)
    setTweenFactor(emblaApi)
    tweenOpacity(emblaApi)
    updateLoaded(emblaApi)
    onSelect(emblaApi)

    emblaApi
      .on('reInit', setTweenNodes)
      .on('reInit', setTweenFactor)
      .on('reInit', tweenOpacity)
      .on('reInit', updateLoaded)
      .on('reInit', onSelect)
      .on('select', onSelect)
      .on('scroll', tweenOpacity)
      .on('slideFocus', tweenOpacity)
      .on('slidesInView', updateLoaded)
  }, [emblaApi, setTweenNodes, setTweenFactor, tweenOpacity, updateLoaded, onSelect])

  /**
   * Any deliberate interaction — dragging, stepping, or touching the video
   * controls — permanently retires the marquee for this row.
   */
  const stopAutoScroll = useCallback(
    (recenter = true) => {
      if (!emblaApi) return
      const autoScroll = emblaApi.plugins().autoScroll
      // Idempotent: repeat calls (the player reports state constantly) are free.
      if (!autoScroll || !autoScroll.isPlaying()) return
      autoScroll.stop()
      // The marquee halts mid-transit, so settle the nearest slide dead centre.
      if (recenter) emblaApi.scrollTo(emblaApi.selectedScrollSnap())
    },
    [emblaApi],
  )

  useEffect(() => {
    if (!emblaApi) return
    // A drag settles itself, so no extra recentre here.
    const handlePointerDown = () => stopAutoScroll(false)
    emblaApi.on('pointerDown', handlePointerDown)
    return () => {
      emblaApi.off('pointerDown', handlePointerDown)
    }
  }, [emblaApi, stopAutoScroll])

  const step = useCallback(
    (direction: -1 | 1) => {
      if (!emblaApi) return
      stopAutoScroll(false)
      if (direction === -1) emblaApi.scrollPrev()
      else emblaApi.scrollNext()
    },
    [emblaApi, stopAutoScroll],
  )

  // Clicks land inside the player's iframe, so they never reach us as events —
  // but focus moves into it, which we can see. Touching YouTube's controls is
  // an interaction, so the marquee retires just like any other.
  useEffect(() => {
    const handleWindowBlur = () => {
      const active = document.activeElement
      if (active?.tagName === 'IFRAME' && rootRef.current?.contains(active)) {
        stopAutoScroll()
      }
    }
    window.addEventListener('blur', handleWindowBlur)
    return () => window.removeEventListener('blur', handleWindowBlur)
  }, [stopAutoScroll])

  const controlClass =
    'flex size-9 items-center justify-center rounded-full border border-white/15 bg-white/5 text-foreground-2nd transition-colors duration-200 hover:border-highlight/60 hover:text-highlight focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-highlighter-2nd'

  return (
    <div className="relative w-3/4 max-lg:w-full" ref={rootRef}>
      <div
        className="embla-viewport h-[400px] sm:h-[300px] lg:h-[400px]"
        ref={emblaRef}
        role="region"
        aria-roledescription="carousel"
        aria-label={`${label} videos`}
      >
        <div className="embla-container">
          {videos.map((video, index) => (
            <VideoSlide
              key={`${video.id}-${index}`}
              video={video}
              isLoaded={loaded[index] ?? false}
              isActive={index === selectedIndex}
              startMuted={!rowUnmuted}
              onMutedChange={(isMuted) => setRowUnmuted(!isMuted)}
              onPlayerInteract={() => stopAutoScroll()}
              onFocusSlide={() => {
                stopAutoScroll(false)
                emblaApi?.scrollTo(index)
              }}
            />
          ))}
        </div>
      </div>

      <div className="mt-4 flex items-center justify-center gap-3">
        <button
          type="button"
          onClick={() => step(-1)}
          aria-label={`Previous ${label} video`}
          className={controlClass}
        >
          <ChevronLeftIcon className="size-4" />
        </button>
        <button
          type="button"
          onClick={() => step(1)}
          aria-label={`Next ${label} video`}
          className={controlClass}
        >
          <ChevronRightIcon className="size-4" />
        </button>
      </div>
    </div>
  )
}
