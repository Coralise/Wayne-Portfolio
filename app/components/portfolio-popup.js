"use client";

import { motion } from "motion/react";
import Tag from "./tag";
import ReactMarkdown from "react-markdown";
import remarkBreaks from "remark-breaks";
import MarkdownRenderer from "./markdown-renderer";

export default function PortfolioCard({ content }) {
    return (
        <div className="rounded-2xl p-2 backdrop-blur-sm">
            <div className="w-full flex items-center gap-4">
                <div className="flex-2 flex flex-col">
                    <h1 className="text-6xl font-black uppercase">{content.title}</h1>
                    <span>{content.subtitle}</span>
                    <span className="text-sm">{content["start-date"] === content["end-date"] ? content["start-date"] : (content["start-date"] + " - " + content["end-date"])}</span>
                    <div className="flex gap-2 mt-2">
                        {[...content.tags].map((tag, index) => (
                            <Tag key={index} text={tag.name} icon={tag.icon} />
                        ))}
                    </div>
                    <div className="pt-1" />
                    <MarkdownRenderer>{content.description}</MarkdownRenderer>
                </div>
                <div className="flex-initial perspective">
                    <motion.div className="relative rounded-3xl">
                        <motion.div className="absolute w-full h-full opacity-30 rounded-3xl"/>
                        <div className="w-full h-full absolute bg-neutral-900 -z-10 rounded-3xl" />
                        <img src={content.image} className="bg-transparent h-80 aspect-video rounded-xl object-contain" />
                    </motion.div>
                </div>
            </div>
            <div className={`${content.gallery.length > 0 ? "h-60" : ""} w-full flex gap-5 mt-5 overflow-y-scroll`}>
                {[...content.gallery].map((media, index) => {
                    const data = media.split(/:(.+)/);
                    const type = data[0];
                    const value = data[1];
                    
                    switch (type) {
                        case "image":
                            return <img key={index} src={value} className="h-full object-cover" />
                        case "video-link":
                            return <iframe src={value} key={index} className="h-full" allowFullScreen />;
                        default:
                            return <div key={index}></div>;
                    }
                })}
            </div>
        </div>
    );
}