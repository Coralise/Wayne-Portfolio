"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { CalendarIcon, CheckIcon, ChevronDownIcon } from "lucide-react";
import { FaGithubAlt } from "react-icons/fa";
import { FaGamepad } from "react-icons/fa6";
import { HiExternalLink } from "react-icons/hi";
import Tag from "./tag";
import ProjectGallery from "./project-gallery";
import { cardVariants } from "./frosted-card";

const linkIcons = {
    website: <HiExternalLink className="size-4" />,
    source: <FaGithubAlt className="size-4" />,
    play: <FaGamepad className="size-4" />,
};

function formatPeriod({ start, end }) {
    return start === end ? start : `${start} – ${end}`;
}

/** How many learnings stay visible before "show more". */
const LEARNINGS_PREVIEW = 3;

export default function ProjectCard({ project, accent }) {
    const [showAllLearnings, setShowAllLearnings] = useState(false);
    const learnings = showAllLearnings ? project.learnings : project.learnings.slice(0, LEARNINGS_PREVIEW);
    const hiddenLearnings = project.learnings.length - LEARNINGS_PREVIEW;

    return (
        <motion.article
            id={project.slug}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            variants={cardVariants}
            style={{ "--accent": accent }}
            className="group grid scroll-mt-24 grid-cols-1 gap-6 rounded-2xl border border-white/5 bg-white/[3%] p-4 shadow-[0px_0px_0px_var(--highlighter)] backdrop-blur-sm transition-shadow duration-500 hover:shadow-[0px_0px_15px_var(--highlighter)] md:p-6 xl:grid-cols-[minmax(0,6fr)_minmax(0,5fr)] xl:gap-10"
        >
            <div className="flex min-w-0 flex-col gap-4">
                <header className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-4">
                        <div className="h-2 w-10 rounded-lg" style={{ backgroundColor: accent }} />
                        <span className="font-barlow-condensed text-sm uppercase tracking-widest text-foreground-2nd">{project.category}</span>
                    </div>
                    <span className="flex items-center gap-1 text-xs font-medium" style={{ color: accent }}>
                        <CalendarIcon className="size-3.5" />
                        {formatPeriod(project.period)}
                    </span>
                </header>

                <div>
                    <h2 className="text-4xl font-black uppercase leading-none md:text-5xl">{project.title}</h2>
                    <p className="mt-2 text-foreground-2nd">{project.tagline}</p>
                </div>

                <div className="flex flex-wrap gap-1">
                    {project.tech.map((tech) => (
                        <Tag key={tech.name} text={tech.name} icon={tech.icon} color={accent} />
                    ))}
                </div>

                <p className="leading-7">{project.summary}</p>

                {project.stats?.length > 0 && (
                    <div className="flex flex-wrap gap-3">
                        {project.stats.map((stat) => (
                            <div key={stat.label} className="rounded-xl border border-white/5 bg-background/30 px-4 py-2">
                                <span className="block text-2xl font-black" style={{ color: accent }}>{stat.value}</span>
                                <span className="font-barlow-condensed text-xs uppercase tracking-widest text-foreground-2nd">{stat.label}</span>
                            </div>
                        ))}
                    </div>
                )}

                <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                    {project.features?.length > 0 && (
                        <section className="rounded-xl border border-white/5 bg-background/30 p-4">
                            <h3 className="mb-2 text-sm font-bold">Key Features</h3>
                            <ul className="flex flex-col gap-1.5 text-sm text-foreground-2nd">
                                {project.features.map((feature) => (
                                    <li key={feature} className="flex gap-2">
                                        <CheckIcon className="mt-0.5 size-4 shrink-0" style={{ color: accent }} />
                                        <span>{feature}</span>
                                    </li>
                                ))}
                            </ul>
                        </section>
                    )}
                    <section className={`rounded-xl border border-white/5 bg-background/30 p-4 ${project.features?.length ? "" : "md:col-span-2"}`}>
                        <h3 className="mb-2 text-sm font-bold">What I Learned</h3>
                        <ul className="flex flex-col gap-1.5 text-sm text-foreground-2nd">
                            {learnings.map((learning) => (
                                <li key={learning} className="flex gap-2">
                                    <span className="mt-2 size-1.5 shrink-0 rounded-full" style={{ backgroundColor: accent }} />
                                    <span>{learning}</span>
                                </li>
                            ))}
                        </ul>
                        {hiddenLearnings > 0 && (
                            <button
                                type="button"
                                onClick={() => setShowAllLearnings((shown) => !shown)}
                                aria-expanded={showAllLearnings}
                                className="mt-2 flex items-center gap-1 text-xs text-foreground-2nd transition-colors duration-300 hover:text-highlighter-2nd"
                            >
                                {showAllLearnings ? "Show less" : `+${hiddenLearnings} more`}
                                <ChevronDownIcon className={`size-3.5 transition-transform duration-300 ${showAllLearnings ? "rotate-180" : ""}`} />
                            </button>
                        )}
                    </section>
                </div>

                {project.links.length > 0 && (
                    <div className="mt-auto flex flex-wrap gap-2 pt-2">
                        {project.links.map((link, i) => (
                            <a
                                key={link.url}
                                href={link.url}
                                target="_blank"
                                rel="noreferrer"
                                className={`flex items-center gap-2 rounded-lg border-2 px-4 py-2 text-sm font-bold transition-all duration-300 ${i === 0
                                    ? "border-highlighter-2nd bg-highlighter-2nd text-background hover:bg-transparent hover:text-highlighter-2nd"
                                    : "border-white/15 text-foreground-2nd hover:border-highlighter-2nd hover:text-highlighter-2nd"}`}
                            >
                                {linkIcons[link.kind]}
                                {link.label}
                            </a>
                        ))}
                    </div>
                )}
            </div>

            <div className="order-first min-w-0 xl:sticky xl:top-24 xl:order-none xl:self-start">
                <ProjectGallery media={project.media} title={project.title} accent={accent} />
            </div>
        </motion.article>
    );
}
