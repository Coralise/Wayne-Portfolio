/**
 * Poster candidates, best first. YouTube only guarantees `hqdefault`, so the
 * caller walks this list on load errors.
 *
 * Portrait uploads (Shorts) get `oardefault` first — it is stored at the
 * video's original aspect ratio, whereas the standard poster sizes are 16:9
 * with the vertical frame squeezed into the middle, which looks awful once
 * cropped back to 9:16.
 */
export function thumbnailCandidates(videoId: string, portrait: boolean): string[] {
  const base = `https://i.ytimg.com/vi/${videoId}`
  return portrait
    ? [
        `${base}/oardefault.jpg`,
        `${base}/maxresdefault.jpg`,
        `${base}/sddefault.jpg`,
        `${base}/hqdefault.jpg`,
      ]
    : [
        `${base}/maxresdefault.jpg`,
        `${base}/sddefault.jpg`,
        `${base}/hqdefault.jpg`,
      ]
}

/**
 * Embed for the centred slide: autoplays on arrival and keeps YouTube's own
 * player controls, so sound, scrubbing and fullscreen all work natively.
 *
 * No `loop`/`playlist` params — those make YouTube add previous/next buttons
 * to its control bar. Looping is handled by restarting on the `ended` state
 * over the IFrame API instead, which `enablejsapi` opens up.
 */
export function embedUrl(videoId: string, startMuted: boolean): string {
  const params = new URLSearchParams({
    autoplay: '1',
    mute: startMuted ? '1' : '0',
    controls: '1',
    modestbranding: '1',
    playsinline: '1',
    rel: '0',
    enablejsapi: '1',
  })
  return `https://www.youtube-nocookie.com/embed/${videoId}?${params.toString()}`
}

export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max)
}
