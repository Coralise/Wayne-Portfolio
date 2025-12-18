"use client";

import { motion } from "motion/react";
import PropTypes from "prop-types";
import Tag from "./tag";
import MarkdownRenderer from "./markdown-renderer";

export default function PortfolioCard({ content }) {
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
            <div className="flex-[5] relative flex justify-end hover:scale-105 transition-transform duration-500 cursor-pointer">
                <img src={content.image} alt={content.title} className="bg-transparent w-full rounded-xl object-cover" />
                <div className="absolute inset-0 rounded-xl shadow-[inset_0_0_60px_rgba(0,0,0,1)] hover:shadow-[inset_0_0_0px_rgba(0,0,0,0)] transition-all duration-500" />
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