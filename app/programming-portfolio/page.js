"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { FaGithubAlt } from "react-icons/fa";
import { categoryColors, programmingPortfolio } from "../data/programmingPortfolio";
import ProjectCard from "../components/project-card";
import HashNavigator from "../components/hash-navigator";

const ALL = "All";

function CategoryFilter({ categories, active, onChange }) {
    return (
        <div role="tablist" aria-label="Filter projects by category" className="flex flex-wrap gap-2">
            {categories.map(({ name, count }) => {
                const isActive = name === active;
                const color = categoryColors[name] ?? "var(--foreground)";
                return (
                    <button
                        key={name}
                        type="button"
                        role="tab"
                        aria-selected={isActive}
                        onClick={() => onChange(name)}
                        className={`relative flex items-center gap-2 rounded-lg px-3 py-1 font-barlow-condensed text-sm uppercase tracking-widest transition-colors duration-300 ${isActive ? "text-foreground" : "text-foreground-2nd hover:text-foreground"}`}
                    >
                        {isActive && (
                            <motion.span
                                layoutId="category-pill"
                                className="absolute inset-0 rounded-lg border border-white/10 bg-white/10"
                                transition={{ ease: [.1, .8, .4, 1], duration: .5 }}
                            />
                        )}
                        <span className="relative size-1.5 rounded-full" style={{ backgroundColor: color }} />
                        <span className="relative">{name}</span>
                        <span className="relative text-xs opacity-60">{count}</span>
                    </button>
                );
            })}
        </div>
    );
}

function GithubLink() {
    return (
        <>
            <span className="text-xl font-bold">
                More of my code here<span className="text-highlight">.</span>
            </span>
            <div className="mt-4 flex gap-2">
                <a
                    href="https://github.com/Coralise"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="GitHub profile"
                    className="flex w-fit rounded-lg bg-neutral-400 p-2 text-background shadow-[transparent_0px_0px_5px_4px] transition-all duration-500 hover:bg-transparent hover:text-[#ff3b3f] hover:shadow-[#ff3b3f_0px_0px_5px_4px]"
                >
                    <FaGithubAlt className="size-4" />
                </a>
            </div>
        </>
    );
}

export default function ProgrammingPortfolio() {
    const [category, setCategory] = useState(ALL);

    // A deep link to a project hidden by the current filter shows everything again.
    useEffect(() => {
        const revealHashTarget = () => {
            const slug = window.location.hash.slice(1);
            if (programmingPortfolio.some((project) => project.slug === slug)) setCategory(ALL);
        };
        window.addEventListener("hashchange", revealHashTarget);
        return () => window.removeEventListener("hashchange", revealHashTarget);
    }, []);

    const categories = useMemo(() => {
        const counts = {};
        programmingPortfolio.forEach((project) => {
            counts[project.category] = (counts[project.category] ?? 0) + 1;
        });
        return [
            { name: ALL, count: programmingPortfolio.length },
            ...Object.entries(counts).map(([name, count]) => ({ name, count })),
        ];
    }, []);

    const projects = category === ALL
        ? programmingPortfolio
        : programmingPortfolio.filter((project) => project.category === category);

    return (
        <main className="flex w-full gap-8 p-6 max-md:flex-col max-md:p-4">
            <HashNavigator />

            <aside className="relative flex w-1/5 shrink-0 flex-col items-center max-lg:hidden">
                <div className="sticky top-[50vh] w-full -translate-y-1/2 rounded-xl border border-white/5 bg-white/5 p-4 backdrop-blur-sm">
                    <GithubLink />
                    <nav aria-label="Projects" className="mt-6 flex flex-col gap-1">
                        {projects.map((project) => (
                            <a
                                key={project.slug}
                                href={`#${project.slug}`}
                                className="group/nav flex items-center gap-2 font-barlow-condensed text-sm uppercase tracking-widest text-foreground-2nd transition-colors duration-300 hover:text-highlight"
                            >
                                <span
                                    className="size-1.5 shrink-0 rounded-full opacity-40 transition-opacity duration-300 group-hover/nav:opacity-100"
                                    style={{ backgroundColor: categoryColors[project.category] }}
                                />
                                <span className="truncate">{project.title}</span>
                            </a>
                        ))}
                    </nav>
                </div>
            </aside>

            <div className="mt-20 flex min-w-0 flex-1 flex-col gap-10">
                <header className="flex flex-col gap-4">
                    <div>
                        <h1 className="text-5xl font-bold">
                            Programming<span className="font-black text-highlight">.</span>
                        </h1>
                        <p className="mt-2 max-w-2xl text-foreground-2nd">
                            Web apps, games, plugins and systems I&apos;ve built — from Minecraft servers to real-time multiplayer on the web.
                        </p>
                    </div>
                    <CategoryFilter categories={categories} active={category} onChange={setCategory} />
                </header>

                <motion.div layout className="flex flex-col gap-10">
                    <AnimatePresence mode="popLayout" initial={false}>
                        {projects.map((project) => (
                            <motion.div
                                key={project.slug}
                                layout
                                initial={{ opacity: 0, y: 40 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: .97 }}
                                transition={{ ease: [.1, .8, .4, 1], duration: .5 }}
                            >
                                <ProjectCard project={project} accent={categoryColors[project.category]} />
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>

                <div className="mb-20 flex flex-col items-center rounded-xl border border-white/5 bg-white/5 p-4 backdrop-blur-sm lg:hidden">
                    <GithubLink />
                </div>
            </div>
        </main>
    );
}
