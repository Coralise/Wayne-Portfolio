"use client";

import { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { ChevronLeftIcon, ChevronRightIcon, Maximize2Icon, PlayIcon, XIcon } from "lucide-react";

function thumbnailOf(media) {
    return media.type === "youtube" ? `https://i.ytimg.com/vi/${media.id}/hqdefault.jpg` : media.src;
}

function MediaView({ media, title, contain = true }) {
    if (media.type === "youtube") {
        return (
            <iframe
                src={`https://www.youtube-nocookie.com/embed/${media.id}?rel=0&modestbranding=1`}
                title={media.title ?? title}
                className="absolute inset-0 h-full w-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
            />
        );
    }
    return (
        <Image
            src={media.src}
            alt={media.alt ?? title}
            fill
            className={contain ? "object-contain" : "object-cover"}
            unoptimized
        />
    );
}

const controlClass =
    "flex size-9 items-center justify-center rounded-full border border-white/15 bg-black/40 text-foreground backdrop-blur-sm transition-colors duration-200 hover:border-[#ff3b3f]/60 hover:text-highlight focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-highlighter-2nd";

export default function ProjectGallery({ media, title, accent }) {
    const [index, setIndex] = useState(0);
    const [lightbox, setLightbox] = useState(false);
    const [mounted, setMounted] = useState(false);
    const count = media.length;
    const current = media[index];

    const step = useCallback((direction) => {
        setIndex((i) => (i + direction + count) % count);
    }, [count]);

    useEffect(() => setMounted(true), []);

    useEffect(() => {
        if (!lightbox) return;
        const onKey = (event) => {
            if (event.key === "Escape") setLightbox(false);
            if (event.key === "ArrowLeft") step(-1);
            if (event.key === "ArrowRight") step(1);
        };
        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        window.addEventListener("keydown", onKey);
        return () => {
            document.body.style.overflow = previousOverflow;
            window.removeEventListener("keydown", onKey);
        };
    }, [lightbox, step]);

    return (
        <div className="flex flex-col gap-3">
            <div className="group/viewer relative aspect-video w-full overflow-hidden rounded-xl border border-white/5 bg-black/30">
                <AnimatePresence mode="wait" initial={false}>
                    <motion.div
                        key={index}
                        className="absolute inset-0"
                        initial={{ opacity: 0, filter: "blur(5px)" }}
                        animate={{ opacity: 1, filter: "blur(0px)" }}
                        exit={{ opacity: 0, filter: "blur(5px)" }}
                        transition={{ ease: [.1, .8, .4, 1], duration: .4 }}
                    >
                        <MediaView media={current} title={title} />
                    </motion.div>
                </AnimatePresence>

                {current.type === "image" && (
                    <button
                        type="button"
                        onClick={() => setLightbox(true)}
                        aria-label={`Expand ${title} screenshot`}
                        className={`${controlClass} absolute right-3 top-3 opacity-0 group-hover/viewer:opacity-100 focus-visible:opacity-100 max-lg:opacity-100`}
                    >
                        <Maximize2Icon className="size-4" />
                    </button>
                )}

                {count > 1 && (
                    <>
                        <button type="button" onClick={() => step(-1)} aria-label="Previous" className={`${controlClass} absolute left-3 top-1/2 -translate-y-1/2`}>
                            <ChevronLeftIcon className="size-4" />
                        </button>
                        <button type="button" onClick={() => step(1)} aria-label="Next" className={`${controlClass} absolute right-3 top-1/2 -translate-y-1/2`}>
                            <ChevronRightIcon className="size-4" />
                        </button>
                        <span className="pointer-events-none absolute bottom-3 left-3 rounded-lg bg-black/50 px-2 py-0.5 font-barlow-condensed text-xs tracking-widest text-foreground backdrop-blur-sm">
                            {index + 1} / {count}
                        </span>
                    </>
                )}
            </div>

            {count > 1 && (
                <div className="hidden-scrollbar flex gap-2 overflow-x-auto pb-1">
                    {media.map((item, i) => (
                        <button
                            key={i}
                            type="button"
                            onClick={() => setIndex(i)}
                            aria-label={`Show media ${i + 1}`}
                            aria-current={i === index}
                            className={`relative aspect-video w-20 shrink-0 overflow-hidden rounded-lg border-2 transition-all duration-300 ${i === index ? "opacity-100" : "border-transparent opacity-40 hover:opacity-80"}`}
                            style={i === index ? { borderColor: accent } : undefined}
                        >
                            <Image src={thumbnailOf(item)} alt="" fill className="object-cover" unoptimized />
                            {item.type === "youtube" && (
                                <span className="absolute inset-0 flex items-center justify-center bg-black/30">
                                    <PlayIcon className="size-4 fill-white text-white" />
                                </span>
                            )}
                        </button>
                    ))}
                </div>
            )}

            {/* Portalled: the card's backdrop-filter would otherwise trap `position: fixed`. */}
            {mounted && createPortal(<AnimatePresence>
                {lightbox && (
                    <motion.div
                        className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 p-4 backdrop-blur-md"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setLightbox(false)}
                        role="dialog"
                        aria-modal="true"
                        aria-label={`${title} gallery`}
                    >
                        <motion.div
                            className="relative h-[80vh] w-full max-w-6xl"
                            onClick={(event) => event.stopPropagation()}
                            initial={{ scale: .95, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: .95, y: 20 }}
                            transition={{ ease: [.1, .8, .4, 1], duration: .4 }}
                        >
                            <MediaView media={current} title={title} />
                        </motion.div>
                        <button type="button" onClick={() => setLightbox(false)} aria-label="Close" className={`${controlClass} absolute right-4 top-4`}>
                            <XIcon className="size-4" />
                        </button>
                        {count > 1 && (
                            <div className="absolute bottom-6 flex items-center gap-3" onClick={(event) => event.stopPropagation()}>
                                <button type="button" onClick={() => step(-1)} aria-label="Previous" className={controlClass}>
                                    <ChevronLeftIcon className="size-4" />
                                </button>
                                <span className="font-barlow-condensed text-sm tracking-widest text-foreground-2nd">{index + 1} / {count}</span>
                                <button type="button" onClick={() => step(1)} aria-label="Next" className={controlClass}>
                                    <ChevronRightIcon className="size-4" />
                                </button>
                            </div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>, document.body)}
        </div>
    );
}
