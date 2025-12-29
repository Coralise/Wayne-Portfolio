"use client";

import Card from "../components/card";
import Tag from "../components/tag";
import { FaBootstrap, FaCss3, FaDiscord, FaFacebookF, FaFigma, FaGitAlt, FaGithubAlt, FaHtml5, FaLinkedinIn, FaNodeJs, FaReact } from "react-icons/fa";
import { TbBrandCSharp, TbBrandMysql } from "react-icons/tb";
import { BiLogoSpringBoot } from "react-icons/bi";
import { motion, useMotionValueEvent, useScroll, useTransform } from "motion/react";
import ContactButton from "../components/contact-button";
import { useRef, useState } from "react";
import { ProgressTimelineCard, TimelineCard } from "../components/timeline-card";
import { RiFlutterFill, RiJavaLine, RiTailwindCssFill } from "react-icons/ri";
import { SiAdobe, SiAdobeaftereffects, SiAdobeillustrator, SiAdobephotoshop, SiAdobepremierepro, SiCanva, SiExpress, SiLua, SiNextdotjs, SiSpigotmc, SiSpringboot } from "react-icons/si";
import { FaDartLang } from "react-icons/fa6";

export default function Resume() {

    const defaultTransition = {
        duration: .5
    }

    const gradientHover = {
        "rest": {
            backgroundImage: "linear-gradient(135deg, var(--foreground) -20%, rgba(255,255,255,.75) -10%, var(--foreground) 0%)"
        },
        "hover": {
            backgroundImage: "linear-gradient(135deg, var(--foreground) 100%, rgba(255,255,255,.75) 110%, var(--foreground) 120%)"
        },
    }

    const beforeMail = {
        "rest": {
            width: "0%"
        },
        "hover": {
            width: "100%"
        }
    }

    const targetRef = useRef(null);
    const {scrollYProgress} = useScroll({
        target: targetRef,
        offset: ["start center", "end 75%"]
    });
    const draw = useTransform(scrollYProgress, [0, 1], [0, 1]);

    const [maxDraw, setMaxDraw] = useState(0);
    useMotionValueEvent(draw, "change", (val) => {
        if (val > maxDraw) setMaxDraw(val);
    });

    const revealXOpacity = {
        "hidden": {
            x: 20,
            opacity: 0
        },
        "revealed": {
            x: 0,
            opacity: 1
        }
    };
    return (
        <div className="p-12 w-fit">
            <div className="text-center flex max-md:flex-col max-md:gap-5 justify-center w-full mt-20">
                <div id="prof-pic-wrapper" className="relative max-md:self-center">
                    <div className="absolute bg-highlighter bg-opacity-20 blur-3xl rounded-full w-72 h-72 -left-24 top-1/2 transform -translate-y-1/2 z-0" />
                    <motion.img
                    initial={{
                        x: -20
                    }}
                    animate={{
                        x: 0
                    }}
                    transition={{...defaultTransition, duration: .7}}
                        id="prof-pic"
                        className="z-10 size-72 rounded-full object-cover object-top relative"
                        src="images/winnie.png"
                        alt=""
                    />
                </div>
                <div className="z-20 content-center md:-translate-x-5">
                    <motion.div id="prof-title" className="relative bg-opacity-75 backdrop-blur-sm bg-gray-500/5 p-4 rounded-xl shadow-md z-20"
                    initial={{
                        x: 20
                    }}
                    animate={{
                        x: 0
                    }}
                    transition={{...defaultTransition, duration: .75}}
                    >
                        <h1 className="text-4xl font-bold text-highlight mb-2 font-sour-gummy">
                            Wayne Gabule
                        </h1>
                        <h3 className="text-lg">
                            Programmer & Motion Graphics Designer
                        </h3>
                    </motion.div>
                </div>
            </div>
            <div className="md:flex gap-12 md:mt-32">
                <ContactMeCard gradientHover={gradientHover} beforeMail={beforeMail} className="max-md:hidden" />
                <div className="grow w-full relative flex flex-col items-center">
                    <motion.div initial="hidden" whileInView="revealed" viewport={{ once: true, amount: .75 }} transition={{ staggerChildren: .2 }} className="flex flex-col items-center max-md:mt-32">
                        <motion.div transition={defaultTransition}
                        variants={revealXOpacity}
                        className="text-5xl font-extrabold text-highlight font-sour-gummy w-fit text-center">PROFILE</motion.div>
                        <motion.p transition={defaultTransition}
                        variants={revealXOpacity}
                        className="indent-12 text-foreground-2nd mt-4 lg:w-1/2 text-justify leading-loose">
                            I am a <span className="text-foreground font-semibold">BS in Information Technology</span> graduate from Ateneo de Davao University with freelance experience in <span className="text-foreground font-semibold">Java programming</span> and <span className="text-foreground font-semibold">video editing</span>. I strive to excel in these fields, including <span className="text-foreground font-semibold">motion graphics design, front-end development</span>, and many more.
                        </motion.p>
                    </motion.div>

                    <BiTimeline maxDraw={maxDraw} targetRef={targetRef} className="hidden max-sm:hidden max-md:flex lg:flex" />
                    <MonoTimeline className="lg:hidden max-md:hidden max-sm:flex" />

                    <div className="flex flex-col items-center mt-40 md:mb-40">
                        <motion.div initial="hidden" whileInView="revealed" viewport={{ once: true, amount: .50 }} transition={{ staggerChildren: .2 }} className="flex flex-col items-center max-md:mt-32">
                            <motion.div transition={defaultTransition}
                            variants={revealXOpacity}
                            className="text-5xl font-extrabold text-highlight font-sour-gummy w-fit text-center">SKILLS</motion.div>
                            <motion.div transition={defaultTransition} variants={revealXOpacity} className="flex gap-4 mt-4 flex-col max-sm:flex-col max-md:flex-row lg:flex-row">
                                <div className="flex-1">
                                <div className="font-bold w-full text-center">Tech Stack</div>
                                    <div className="flex flex-wrap gap-4 mt-2 justify-center">
                                        <SkillIcon text="Java" icon={<RiJavaLine />} />
                                        <SkillIcon text="Spring Boot" icon={<SiSpringboot />} />
                                        <SkillIcon text="MySQL" icon={<TbBrandMysql />} />
                                        <SkillIcon text="ReactJS" icon={<FaReact />} />
                                        <SkillIcon text="Lua" icon={<SiLua />} />
                                        <SkillIcon text="Figma" icon={<FaFigma />} />
                                        <SkillIcon text="Flutter" icon={<RiFlutterFill />} />
                                        <SkillIcon text="Dart" icon={<FaDartLang />} />
                                        <SkillIcon text="C#" icon={<TbBrandCSharp />} />
                                        <SkillIcon text="Git" icon={<FaGitAlt />} />
                                        <SkillIcon text="NextJS" icon={<SiNextdotjs />} />
                                        <SkillIcon text="NodeJS" icon={<FaNodeJs />} />
                                        <SkillIcon text="ExpressJS" icon={<SiExpress />} />
                                        <SkillIcon text="HTML" icon={<FaHtml5 />} />
                                        <SkillIcon text="CSS" icon={<FaCss3 />} />
                                        <SkillIcon text="Tailwind" icon={<RiTailwindCssFill />} />
                                        <SkillIcon text="Bootstrap" icon={<FaBootstrap />} />
                                    </div>
                                </div>
                                <div className="flex-1">
                                    <div className="font-bold w-full text-center">Multimedia</div>
                                    <div className="flex flex-wrap gap-4 mt-2 justify-center">
                                        <SkillIcon text="After Effects" icon={<SiAdobeaftereffects />} />
                                        <SkillIcon text="Photoshop" icon={<SiAdobephotoshop />} />
                                        <SkillIcon text="Illustrator" icon={<SiAdobeillustrator />} />
                                        <SkillIcon text="Premiere Pro" icon={<SiAdobepremierepro />} />
                                        <SkillIcon text="Canva" icon={<SiCanva />} />
                                    </div>
                                </div>
                            </motion.div>
                        </motion.div>
                    </div>

                    <div className="flex flex-col items-center mt-40 md:mb-40">
                        <motion.div initial="hidden" whileInView="revealed" viewport={{ once: true, amount: .50 }} transition={{ staggerChildren: .2 }} className="flex flex-col items-center max-md:mt-32">
                            <motion.div transition={defaultTransition}
                            variants={revealXOpacity}
                            className="text-5xl font-extrabold text-highlight font-sour-gummy w-fit text-center">ACHIEVEMENTS</motion.div>
                            <motion.div transition={defaultTransition} variants={revealXOpacity} className="flex flex-col gap-4 mt-4">
                                <div className="flex flex-wrap gap-4 mt-2 justify-center">
                                    <span>AI Hackathon Champion (2025)</span>
                                </div>
                            </motion.div>
                        </motion.div>
                    </div>

                    <div className="mt-40"></div>
                </div>
                <div className="flex justify-center mt-32 md:hidden">
                    <ContactMeCard beforeMail={beforeMail} gradientHover={gradientHover} className="w-fit" />
                </div>
            </div>
        </div>
    );
}

function SkillIcon({ text, icon }) {
    return <div className="flex flex-col items-center gap-1 group relative">
        <div
        className={`bg-background transition-all duration-300 p-3 text-4xl text-foreground-2nd rounded-2xl group-hover:bg-highlighter group-hover:border-foreground border-2 border-foreground-2nd group-hover:rounded-[2rem] group-hover:shadow-[var(--highlighter)_0px_0px_7px_1px]`}>
            <div className="opacity-1 scale-100 group-hover:opacity-0 group-hover:scale-50 transition-all duration-300">
                {icon}
            </div>
        </div>
        <span className={`select-none font-barlow-condensed text-sm text-foreground opacity-0 scale-150 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300 absolute top-1/2 -translate-y-1/2 font-medium w-full text-center px-2`}>{text}</span>
    </div>;
}

function MonoTimeline({ className }) {
    return <div className={`${className} mt-60 flex w-full justify-start pb-8`}>
        <div className="relative">
            <motion.div style={{ transformOrigin: "top" }} className="bg-foreground w-1 h-[calc(100%+2rem)] rounded-full relative" />
            <motion.div initial="hidden" whileInView="revealed" viewport={{ amount: 1, once: true }} className="pb-[25vh] -left-1.5 absolute top-0">
                <motion.div variants={{ "hidden": { scale: 0 }, "revealed": { scale: 1 } }} className="aspect-square rounded-full w-4 h-4 border-[3px] border-highlight bg-background" />
            </motion.div>
        </div>
        <div>
            <div className="flex flex-col items-start pl-4 flex-1">
                <div className="font-bold text-2xl">WORK EXPERIENCE</div>
                <TimelineCard
                    className="mt-8" jobTitle="Java Plugin Developer" company="Freelance" date="February 2020 - Present" tags={[[<RiJavaLine />, "Java"], [<TbBrandMysql />, "MySQL"], [<SiSpigotmc />, "Spigot MC"]]} tagColor="#3498db">
                    <ul className="list-disc pl-4">
                        <li>Developed plugins (add-ons and modifications) for games such as Minecraft.</li>
                        <li>Was able to work on and experience Java Programming and MySQL Database Management.</li>
                        <li>Honed necessary skills for Object-Oriented Programming and Complex Database Logic and Queries.</li>
                        <li>Presently and actively updating my developed plugins, allowing me to easily practice and sharpen my skills on a weekly basis.</li>
                    </ul>
                </TimelineCard>
                <TimelineCard
                    className="mt-8" jobTitle="Associate Engineer 1" company="Orange & Bronze" date="July 2024 - December 2025" tags={[[<RiJavaLine />, "Java"], [<TbBrandMysql />, "MySQL"], [<BiLogoSpringBoot />, "Spring Boot"]]} tagColor="#3498db">
                    <ul className="list-disc pl-4">
                        <li>Implement features under the guidance of more senior developers, and in compliance with company & client practices.</li>
                        <li>Allots time to learn software development practices & technologies as prescribed by the company and as needed by the client.</li>
                        <li>Contributes to ideas & plans of the team.</li>
                        <li>Coordinates directly with client counterparts.</li>
                    </ul>
                </TimelineCard>
                <TimelineCard
                    className="mt-8" jobTitle="Admin/Video Editor" company="Lava Automation" date="March 2023 - December 2024" tags={[[<SiAdobe />, "Adobe"], [<SiAdobeaftereffects />, "After Effects"], [<SiAdobepremierepro />, "Premiere Pro"], [<SiAdobeillustrator />, "Illustrator"], [<SiAdobephotoshop />, "Photoshop"]]} tagColor="#3498db">
                    <ul className="list-disc pl-4">
                        <li>In charge of all things video editing related, from video construction to motion graphic animation.</li>
                        <li>Helped create the company's current logo and have designed all of its animations, both 2D and 3D.</li>
                        <li>Made infographics, PowerPoints, and similar graphic visualizations mainly for company advertisements.</li>
                    </ul>
                </TimelineCard>
            </div>
            <div className="flex flex-col items-start pl-4 flex-1 mt-32">
                <div className="font-bold text-2xl">EDUCATION & CERTIFICATIONS</div>
                <TimelineCard
                    className="mt-8" jobTitle="BS Information Technology" company="Ateneo de Davao University College" date="2020 - 2024" tags={["Honor Student", "Scholar", "President's Lister"]} tagColor="#2ecc71">
                    <p className="text-foreground-2nd">Graduated with consistent academic honors while developing strong foundations in software development, database management, and system design.</p>
                </TimelineCard>
                <TimelineCard
                    className="mt-8" jobTitle="Java Fundamentals Certification" company="Orange & Bronze" date="June 2025" tags={[[<RiJavaLine />, "Java"]]} tagColor="#2ecc71">
                    <p className="text-foreground-2nd">Certified in enterprise Java development covering OOP design patterns, coding standards, and industry best practices for building scalable applications.</p>
                </TimelineCard>
                <TimelineCard
                    className="mt-8" jobTitle="SQL Fundamentals Certification" company="Orange & Bronze" date="June 2025" tags={[[<TbBrandMysql />, "SQL"]]} tagColor="#2ecc71">
                    <p className="text-foreground-2nd">Certified in relational database design, complex query optimization, data manipulation, and backend data management techniques.</p>
                </TimelineCard>
                <TimelineCard
                    className="mt-8" jobTitle="Linux Administration Certification" company="Orange & Bronze" date="March 2025" tags={[]}>
                    <p className="text-foreground-2nd">Certified in Linux server administration, shell scripting, and configuring deployment environments for production applications.</p>
                </TimelineCard>
                <TimelineCard
                    className="mt-8" jobTitle="Git Version Control Certification" company="Orange & Bronze" date="December 2024" tags={[[<FaGitAlt />, "Git"]]} tagColor="#2ecc71">
                    <p className="text-foreground-2nd">Certified in Git branching strategies, collaborative workflows, code review processes, and enterprise repository management.</p>
                </TimelineCard>
                <TimelineCard
                    className="mt-8" jobTitle="Docker & Kubernetes Certification" company="Orange & Bronze" date="June 2024" tags={[]}>
                    <p className="text-foreground-2nd">Certified in containerization, container orchestration, and DevOps practices for modern cloud-native application deployment.</p>
                </TimelineCard>
                <TimelineCard
                    className="mt-8" jobTitle="TOPCIT Level 3 Certification" company="IITP Korea" date="April 2024" tags={["Top 30% Nationally", "140% Above Average"]} tagColor="#2ecc71">
                    <p className="text-foreground-2nd">Achieved 456/1000 on the Test of Practical Competency in IT, ranking in the top 30% nationwide and exceeding the country average by 140%.</p>
                </TimelineCard>
            </div>
        </div>
    </div>;
}

function BiTimeline({ maxDraw, targetRef, className }) {
    return <div className={`${className} mt-60 flex w-full justify-start pb-8`}>
        <div className="flex flex-col items-end pr-4 flex-1">
            <div className="font-bold text-2xl">WORK EXPERIENCE</div>
            <ProgressTimelineCard drawProgress={maxDraw} drawPosition={0.15}
                className="mt-12" jobTitle="Associate Engineer 1" company="Orange & Bronze" date="July 2024 - Present" side="left" tags={[[<RiJavaLine />, "Java"], [<TbBrandMysql />, "MySQL"], [<BiLogoSpringBoot />, "Spring Boot"]]} tagColor="#3498db">
                <ul className="list-disc pl-4">
                    <li>Implement features under the guidance of more senior developers, and in compliance with company & client practices.</li>
                    <li>Allots time to learn software development practices & technologies as prescribed by the company and as needed by the client.</li>
                    <li>Contributes to ideas & plans of the team.</li>
                    <li>Coordinates directly with client counterparts.</li>
                </ul>
            </ProgressTimelineCard>
            <ProgressTimelineCard drawProgress={maxDraw} drawPosition={0.30}
                className="mt-8" jobTitle="Java Plugin Developer" company="Freelance" date="February 2020 - Present" side="left" tags={[[<RiJavaLine />, "Java"], [<TbBrandMysql />, "MySQL"], [<SiSpigotmc />, "Spigot MC"]]} tagColor="#3498db">
                <ul className="list-disc pl-4">
                    <li>Developed plugins (add-ons and modifications) for games such as Minecraft.</li>
                    <li>Was able to work on and experience Java Programming and MySQL Database Management.</li>
                    <li>Honed necessary skills for Object-Oriented Programming and Complex Database Logic and Queries.</li>
                    <li>Presently and actively updating my developed plugins, allowing me to easily practice and sharpen my skills on a weekly basis.</li>
                </ul>
            </ProgressTimelineCard>
            <ProgressTimelineCard drawProgress={maxDraw} drawPosition={0.55}
                className="mt-8" jobTitle="Admin/Video Editor" company="Lava Automation" date="March 2023 - December 2024" side="left" tags={[[<SiAdobe />, "Adobe"], [<SiAdobeaftereffects />, "After Effects"], [<SiAdobepremierepro />, "Premiere Pro"], [<SiAdobeillustrator />, "Illustrator"], [<SiAdobephotoshop />, "Photoshop"]]} tagColor="#3498db">
                <ul className="list-disc pl-4">
                    <li>In charge of all things video editing related, from video construction to motion graphic animation.</li>
                    <li>Helped create the company's current logo and have designed all of its animations, both 2D and 3D.</li>
                    <li>Made infographics, PowerPoints, and similar graphic visualizations mainly for company advertisements.</li>
                </ul>
            </ProgressTimelineCard>
        </div>
        <div className="relative">
            <motion.div ref={targetRef} style={{ scaleY: maxDraw, transformOrigin: "top" }} className="bg-foreground w-1 h-[calc(100%+2rem)] rounded-full relative" />
            <motion.div initial="hidden" whileInView="revealed" viewport={{ amount: 1, once: true }} className="pb-[25vh] -left-1.5 absolute top-0">
                <motion.div variants={{ "hidden": { scale: 0 }, "revealed": { scale: 1 } }} className="aspect-square rounded-full w-4 h-4 border-[3px] border-highlight bg-background" />
            </motion.div>
        </div>
        <div className="flex flex-col items-start pl-4 flex-1">
            <div className="font-bold text-2xl">EDUCATION & CERTIFICATIONS</div>
            <ProgressTimelineCard drawProgress={maxDraw} drawPosition={0.08}
                className="mt-12" jobTitle="BS Information Technology" company="Ateneo de Davao University College" date="2020 - 2024" tags={["Honor Student", "Scholar", "President's Lister"]} tagColor="#2ecc71">
            </ProgressTimelineCard>
            <ProgressTimelineCard drawProgress={maxDraw} drawPosition={0.20}
                className="mt-8" jobTitle="Java Fundamentals" company="Orange & Bronze" date="June 2025" tags={[[<RiJavaLine />, "Java"]]} tagColor="#2ecc71">
                <p>Enterprise Java, OOP design patterns, and coding standards.</p>
            </ProgressTimelineCard>
            <ProgressTimelineCard drawProgress={maxDraw} drawPosition={0.32}
                className="mt-8" jobTitle="SQL Fundamentals" company="Orange & Bronze" date="June 2025" tags={[[<TbBrandMysql />, "SQL"]]} tagColor="#2ecc71">
                <p>Database design, complex queries, and data optimization.</p>
            </ProgressTimelineCard>
            <ProgressTimelineCard drawProgress={maxDraw} drawPosition={0.44}
                className="mt-8" jobTitle="Linux Administration" company="Orange & Bronze" date="March 2025" tags={[]}>
                <p>Server administration, shell scripting, and deployment environments.</p>
            </ProgressTimelineCard>
            <ProgressTimelineCard drawProgress={maxDraw} drawPosition={0.56}
                className="mt-8" jobTitle="Git Version Control" company="Orange & Bronze" date="December 2024" tags={[[<FaGitAlt />, "Git"]]} tagColor="#2ecc71">
                <p>Branching strategies, collaborative workflows, and repository management.</p>
            </ProgressTimelineCard>
            <ProgressTimelineCard drawProgress={maxDraw} drawPosition={0.68}
                className="mt-8" jobTitle="Docker & Kubernetes" company="Orange & Bronze" date="June 2024" tags={[]}>
                <p>Containerization, orchestration, and cloud-native deployment.</p>
            </ProgressTimelineCard>
            <ProgressTimelineCard drawProgress={maxDraw} drawPosition={0.80}
                className="mt-8" jobTitle="TOPCIT Level 3" company="IITP Korea" date="April 2024" tags={["Top 30% Nationally", "140% Above Average"]} tagColor="#2ecc71">
            </ProgressTimelineCard>
        </div>
    </div>;
}

function ContactMeCard({gradientHover, beforeMail, className, center=false}) {
    return (
        <div className={`flex-initial z-10 sticky top-1/4 max-h-screen h-fit ${className} max-md:mb-[12rem]`}>
            <Card card1Style={{ padding: 0 }} className={`flex-initial z-10 max-h-screen ${className}`}>
                <motion.div whileHover="hover" initial="rest" className={`p-4 flex flex-col gap-1 ${center ? "items-center" : ""}`}>
                    <motion.div
                        variants={gradientHover}
                        transition={{ duration: .7 }}
                        className="font-extrabold text-3xl justify-center inline-block text-transparent bg-gradient bg-clip-text select-none">
                        CONTACT ME
                    </motion.div>
                    <motion.div initial="rest" whileHover="hover" className="relative w-fit flex items-center h-6">
                        <motion.span variants={beforeMail} className="absolute bg-gradient-to-r from-highlighter to-background rounded-md h-full -z-10" />
                        <a href="mailto:shaseajojo@gmail.com" className="text-sm text-foreground-2nd w-fit mx-2 hover:text-foreground hover:font-semibold transition-all">shaseajojo@gmail.com</a>
                    </motion.div>
                    <motion.div initial="rest" whileHover="hover" className="relative w-fit flex items-center h-6">
                        <motion.span variants={beforeMail} className="absolute bg-gradient-to-r from-highlighter to-background rounded-md h-full -z-10" />
                        <a href="tel:+639279734717" className="text-sm text-foreground-2nd w-fit mx-2 hover:text-foreground hover:font-semibold transition-all">(+63) 927 973 4717</a>
                    </motion.div>
                    <div className="mt-3 flex gap-2">
                        <a href="https://discord.com/users/254225248889602048" target="_blank" className="flex w-fit p-2 bg-neutral-400 rounded-lg transition-all duration-500 hover:bg-transparent text-background hover:text-[#7289da] shadow-[transparent_0px_0px_5px_4px] hover:shadow-[#7289da_0px_0px_5px_4px]">
                            <FaDiscord className="size-4" />
                        </a>
                        <a href="https://github.com/Coralise" target="_blank" className="flex w-fit p-2 bg-neutral-400 rounded-lg transition-all duration-500 hover:bg-transparent text-background hover:text-[#6e5494] shadow-[transparent_0px_0px_5px_4px] hover:shadow-[#6e5494_0px_0px_5px_4px]">
                            <FaGithubAlt className="size-4" />
                        </a>
                        {/* <a href="https://www.linkedin.com/in/sean-wayne-gabule-083a481a6/" target="_blank" className="flex w-fit p-2 bg-neutral-400 rounded-lg transition-all duration-500 hover:bg-transparent text-background hover:text-[#0077B5] shadow-[transparent_0px_0px_5px_4px] hover:shadow-[#0077B5_0px_0px_5px_4px]">
                            <FaLinkedinIn className="size-4" />
                        </a>
                        <a href="https://www.facebook.com/Waynezki" target="_blank" className="flex w-fit p-2 bg-neutral-400 rounded-lg transition-all duration-500 hover:bg-transparent text-background hover:text-[#1877F2] shadow-[transparent_0px_0px_5px_4px] hover:shadow-[#1877F2_0px_0px_5px_4px]">
                            <FaFacebookF className="size-4" />
                        </a> */}
                    </div>
                    <ContactButton className="mt-3" />
                </motion.div>
            </Card>
            <button className="download-cv-button mt-8 w-full" onClick={() => {
                const link = document.createElement('a');
                link.href = '/Gabule-Resume.pdf';
                link.download = 'Gabule-Resume.pdf';
                document.body.appendChild(link);
                link.click();
                link.remove();
            }}>
                <span className="download-cv-button_lg">
                    <span className="download-cv-button_sl"></span>
                    <span className="download-cv-button_text">Download My Resume</span>
                </span>
            </button>
        </div>
    );
}