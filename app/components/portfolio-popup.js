"use client";

import { motion } from "motion/react";
import Tag from "./tag";
import ReactMarkdown from "react-markdown";
import remarkBreaks from "remark-breaks";
import MarkdownRenderer from "./markdown-renderer";

export default function PortfolioCard({ content }) {
    return (
        <div>
            <div className="w-full flex gap-5 items-center">
                <div className="flex-2 flex flex-col gap-1">
                    <h1 className="text-6xl font-black uppercase text-shadow">{content.title}</h1>
                    <div>{content.subtitle}</div>
                    <div className="text-sm">{content["start-date"] === content["end-date"] ? content["start-date"] : (content["start-date"] + " - " + content["end-date"])}</div>
                    <div className="flex gap-2">
                        {[...content.tags].map((tag, index) => (
                            <Tag key={index}>{tag}</Tag>
                        ))}
                    </div>
                    <div className="pt-1" />
                    <MarkdownRenderer>{content.description}</MarkdownRenderer>
                </div>
                <div className="flex-initial perspective">
                    <motion.div className="relative rounded-3xl"
                    initial={{
                        transform: "translate3D(6rem, 0rem, -5rem) rotateY(-60deg) rotateZ(6deg) rotateX(10deg)",
                        opacity: 0
                    }}
                    whileInView={{
                        transform: "translate3D(0rem, 0rem, -3rem) rotateY(-20deg) rotateZ(3deg) rotateX(-10deg)",
                        opacity: 1
                    }}
                    transition={{
                        duration: .75,
                        ease: "backOut"
                    }}
                    whileHover={{
                        transform: "translate3D(0rem, 0rem, 0rem) rotateY(0deg) rotateZ(0deg) rotateX(0deg)",
                        transition: {
                            duration: .5,
                            ease: "backOut"
                        }
                    }}
                    viewport={{
                        once: true,
                        amount: .7
                    }}
                    >
                        <motion.div className="absolute w-full h-full opacity-30 rounded-3xl"
                            style={{
                                background: "linear-gradient(170deg, rgba(255,255,255,0) 100%, rgba(255,255,255,1) 110%, rgba(255,255,255,0) 120%)"
                            }}
                            whileHover={{
                                background: "linear-gradient(170deg, rgba(255,255,255,0) -10%, rgba(255,255,255,1) -5%, rgba(255,255,255,0) 0%)"
                            }}
                            transition={{
                                duration: .5,
                                ease: "backOut"
                            }}
                        />
                        <div className="w-full h-full absolute bg-neutral-900 -z-10 rounded-3xl" />
                        <img src={content.image} className="bg-transparent h-80 aspect-video rounded-3xl object-contain box-shadow" />
                    </motion.div>
                </div>
            </div>
            <div className="h-60 w-full flex gap-5 mt-5 overflow-y-scroll">
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