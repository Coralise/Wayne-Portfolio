"use client";

import { useState } from "react";
import { motion } from "motion/react";
import PropTypes from "prop-types";
import Tag from "./tag";
import MarkdownRenderer from "./markdown-renderer";

export default function PortfolioCard({ content }) {
    const [activeIndex, setActiveIndex] = useState(0);
    const gallery = (content.gallery && content.gallery.length) ? [...content.gallery] : ["image:" + content.image];

    const prev = () => setActiveIndex((i) => (i - 1 + gallery.length) % gallery.length);
    const next = () => setActiveIndex((i) => (i + 1) % gallery.length);

    const renderMedia = (media) => {
        const data = media.split(/:(.+)/);
        const type = data[0];
        const value = data[1] || "";

        switch (type) {
            case "image":
                return (
                    <>
                        <img src={value} alt={content.title} className="absolute inset-0 z-[1] bg-transparent w-full h-full rounded-xl object-contain transition-all duration-500" />
                        <img src={value} alt={content.title} className="absolute inset-0 z-[2] bg-transparent w-full h-full rounded-xl object-cover opacity-100 group-hover:opacity-0 transition-all duration-500" />
                    </>
                );
            case "video-link":
                return <iframe src={value} className="absolute inset-0 z-[2] w-full h-full rounded-xl" allowFullScreen />;
            default:
                return <div className="absolute inset-0 z-[1] w-full h-full rounded-xl bg-gray-200" />;
        }
    };

    const showArrows = gallery.length > 1; // Check if there are multiple images in the gallery

    return (
        <div className="rounded-2xl h-96 p-2 backdrop-blur-sm flex gap-16">
            <div className="flex-[6] content-center">
                <h1 className="text-6xl font-black uppercase">{content.title}</h1>
                <span>{content.subtitle}</span>
                <span className="text-sm">{content["start-date"] === content["end-date"] ? content["start-date"] : (content["start-date"] + " - " + content["end-date"])}</span>
                <div className="flex gap-2 mt-2">
                    {[...content.tags].map((tag) => (
                        <Tag key={tag.name} text={tag.name} icon={tag.icon} />
                    ))}
                </div>
                <div className="pt-1" />
                <MarkdownRenderer>{content.description}</MarkdownRenderer>
            </div>
            <div className="flex-[5] relative flex justify-end group hover:scale-125 transition-transform duration-500 cursor-pointer">
                <div className="w-full h-full relative">
                    {renderMedia(gallery[activeIndex])}

                    {showArrows && (
                        <>
                            <button onClick={prev} aria-label="Previous" className="absolute left-3 top-1/2 -translate-y-1/2 z-[4] p-2 bg-black/40 hover:bg-black/60 rounded-full text-white">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M12.707 14.707a1 1 0 01-1.414 0L7 10.414l4.293-4.293a1 1 0 011.414 1.414L9.414 10l3.293 3.293a1 1 0 010 1.414z" clipRule="evenodd" />
                                </svg>
                            </button>

                            <button onClick={next} aria-label="Next" className="absolute right-3 top-1/2 -translate-y-1/2 z-[4] p-2 bg-black/40 hover:bg-black/60 rounded-full text-white">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M7.293 5.293a1 1 0 011.414 0L13 9.586 8.707 13.88a1 1 0 01-1.414-1.414L10.586 10 7.293 6.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                </svg>
                            </button>
                        </>
                    )}
                </div>
                <div className="absolute z-[3] inset-0 pointer-events-none rounded-xl h-full w-full shadow-[inset_0_0_60px_rgba(0,0,0,1)] hover:shadow-[inset_0_0_0px_rgba(0,0,0,0)] transition-all duration-500" />
            </div>
        </div>
    );
}

PortfolioCard.propTypes = {
    content: PropTypes.shape({
        title: PropTypes.string.isRequired,
        subtitle: PropTypes.string.isRequired,
        "start-date": PropTypes.string.isRequired,
        "end-date": PropTypes.string.isRequired,
        tags: PropTypes.arrayOf(PropTypes.shape({
            name: PropTypes.string.isRequired,
            icon: PropTypes.string.isRequired,
        })).isRequired,
        description: PropTypes.string.isRequired,
        image: PropTypes.string.isRequired,
        gallery: PropTypes.array.isRequired,
    }).isRequired,
};