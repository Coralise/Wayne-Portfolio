"use client";

import { motion, useMotionValueEvent } from "motion/react";
import { useEffect } from "react";
import Tag from "./tag";

export function ProgressTimelineCard({ className, drawPosition, drawProgress, jobTitle, company, date, children, tags, side="right", tagColor }) {

    const defaultTransition = { duration: .5 };

    const revealOpacity = { "rest": { opacity: 0 }, "revealed": { opacity: 1 } };

    return (
        <motion.div initial="rest" animate={drawPosition >= drawProgress ? "rest" : "revealed"} viewport={{ once: true, amount: 1 }} transition={defaultTransition} className={`${className} items-${side == "right" ? "start" : "end"} flex flex-col w-full group relative`}>
            {Card({ defaultTransition, side, revealOpacity, date, jobTitle, company, children, tags, tagColor })}
        </motion.div>
    );
}

export function TimelineCard({ className, jobTitle, company, date, children, tags, side="right", tagColor }) {

    const defaultTransition = { duration: .5 };

    const revealOpacity = { "rest": { opacity: 0 }, "revealed": { opacity: 1 } };

    return (
        <motion.div initial="rest" whileInView="revealed" viewport={{ once: true, amount: 1 }} transition={defaultTransition} className={`${className} items-${side == "right" ? "start" : "end"} flex flex-col w-full group relative`}>
            {Card({ defaultTransition, side, revealOpacity, date, jobTitle, company, children, tags, tagColor })}
        </motion.div>
    );
}

function Card({ defaultTransition, side, revealOpacity, date, jobTitle, company, children, tags, tagColor }) {
    return <>
        <motion.div transition={defaultTransition} variants={{ "rest": { scale: 0 }, "revealed": { scale: 1 } }} className={`absolute w-4 h-4 rounded-full bg-background border-[3px] border-highlight ${side == "right" ? "-left-[1.62rem]" : "-right-[1.62rem]"} top-3 z-10`} />
        <motion.div transition={defaultTransition} variants={revealOpacity} className="text-sm font-normal text-foreground-2nd group-hover:text-foreground transition-all duration-500">{date}</motion.div>
        <motion.div transition={defaultTransition} variants={revealOpacity} className={`flex flex-col w-full p-3 rounded-${side == "right" ? "r" : "l"}-2xl rounded-b-2xl border-solid border-${side == "right" ? "l" : "r"}-2 border-t-2 hover:border-highlight border-foreground-2nd backdrop-blur-md transition-all bg-white bg-opacity-5 duration-500 hover:scale-[101%] hover:shadow-[0px_5px_8px_1px_rgba(0,0,0,0.1)] shadow-[0px_0px_0px_0px_rgba(0,0,0,0.1)] relative`}>
            <span className="text-lg font-bold">{jobTitle}</span>
            <span className="text-xs text-foreground-2nd font-normal">{company}</span>
            {children && <div className="mt-4 text-sm text-foreground-2nd">
                {children}
            </div>}
            {tags && tags.length > 0 && <div className="flex gap-1 flex-wrap mt-4">
                {[...tags].map((tag, index) => (
                    Array.isArray(tag) 
                        ? <Tag key={index} text={tag[1]} icon={tag[0]} color={tagColor} />
                        : <Tag key={index} text={tag} color={tagColor} />
                ))}
            </div>}
        </motion.div>
    </>;
}
