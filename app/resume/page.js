"use client";

import Card from "../components/card";
import { FaDiscord, FaFacebookF, FaGithub, FaGithubAlt, FaLinkedinIn, FaMobileAlt } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";
import { FaLinkedin } from "react-icons/fa";
import { motion, useScroll, useTransform } from "motion/react";
import ContactButton from "../components/contact-button";
import { useEffect, useRef } from "react";

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

    return (
        <div className="p-6 w-fit">
            <div className="mt-20"></div>
            <div className="text-center flex max-md:flex-col max-md:gap-5 justify-center w-full">
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
                        src="images/illustration.jpg"
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
                            Sean Wayne R. Gabule
                        </h1>
                        <h3 className="text-lg">
                            Programmer & Motion Graphics Designer
                        </h3>
                    </motion.div>
                </div>
            </div>
            <div className="flex gap-8 mt-32">
                <Card card1Style={{ padding: 0 }} className="flex-initial w-1/3 z-10 sticky top-1/4 max-h-screen">
                    <motion.div whileHover="hover" initial="rest" className="p-4 flex flex-col gap-1">
                        <motion.div
                            variants={gradientHover}
                            transition={{ duration: .7 }}
                            className="font-extrabold text-3xl justify-center inline-block text-transparent bg-gradient bg-clip-text select-none">
                                CONTACT ME
                        </motion.div>
                        <motion.div initial="rest" whileHover="hover" className="relative w-fit flex items-center h-6">
                            <motion.span variants={beforeMail} className="absolute bg-gradient-to-r from-highlighter to-background rounded-md h-full -z-10" />
                            <a href="mailto:wayne@gabule.com" className="text-sm text-foreground-2nd w-fit mx-2 hover:text-foreground hover:font-semibold transition-all">wayne@gabule.com</a>
                        </motion.div>
                        <motion.div initial="rest" whileHover="hover" className="relative w-fit flex items-center h-6">
                            <motion.span variants={beforeMail} className="absolute bg-gradient-to-r from-highlighter to-background rounded-md h-full -z-10" />
                            <a href="tel:+639279734717" className="text-sm text-foreground-2nd w-fit mx-2 hover:text-foreground hover:font-semibold transition-all">(+63) 927 973 4717</a>
                        </motion.div>
                        <div className="mt-6 flex gap-2 justify-center">
                            <a href="https://discord.com/users/254225248889602048" target="_blank" className="flex w-fit p-2 bg-neutral-400 rounded-lg transition-all duration-500 hover:bg-transparent text-background hover:text-[#7289da] shadow-[transparent_0px_0px_5px_4px] hover:shadow-[#7289da_0px_0px_5px_4px]">
                                <FaDiscord className="size-6" />
                            </a>
                            <a href="https://github.com/Coralise" target="_blank" className="flex w-fit p-2 bg-neutral-400 rounded-lg transition-all duration-500 hover:bg-transparent text-background hover:text-[#6e5494] shadow-[transparent_0px_0px_5px_4px] hover:shadow-[#6e5494_0px_0px_5px_4px]">
                                <FaGithubAlt className="size-6" />
                            </a>
                            <a href="https://www.linkedin.com/in/sean-wayne-gabule-083a481a6/" target="_blank" className="flex w-fit p-2 bg-neutral-400 rounded-lg transition-all duration-500 hover:bg-transparent text-background hover:text-[#0077B5] shadow-[transparent_0px_0px_5px_4px] hover:shadow-[#0077B5_0px_0px_5px_4px]">
                                <FaLinkedinIn className="size-6" />
                            </a>
                            <a href="https://www.facebook.com/Waynezki" target="_blank" className="flex w-fit p-2 bg-neutral-400 rounded-lg transition-all duration-500 hover:bg-transparent text-background hover:text-[#1877F2] shadow-[transparent_0px_0px_5px_4px] hover:shadow-[#1877F2_0px_0px_5px_4px]">
                                <FaFacebookF className="size-6" />
                            </a>
                        </div>
                        <ContactButton className="mt-8" />
                    </motion.div>
                </Card>
                <div className="grow w-full relative flex flex-col items-center">
                    <motion.div initial="hidden" whileInView="revealed" viewport={{ once: true, amount: .75 }} transition={{ staggerChildren: .2 }} className="flex flex-col items-center">
                        <motion.div transition={defaultTransition}
                        variants={{
                            "hidden": {
                                x: 20,
                                opacity: 0
                            },
                            "revealed": {
                                x: 0,
                                opacity: 1
                            }
                        }}
                        className="text-5xl font-extrabold text-highlight font-sour-gummy w-fit text-center">PROFILE</motion.div>
                        <motion.p transition={defaultTransition}
                        variants={{
                            "hidden": {
                                x: 20,
                                opacity: 0
                            },
                            "revealed": {
                                x: 0,
                                opacity: 1
                            }
                        }}
                        className="indent-12 text-foreground-2nd mt-4 w-1/2 text-justify leading-loose">
                            I am a recent <span className="text-foreground font-semibold">BS in Information Technology</span> graduate from Ateneo de Davao University with freelance experience in <span className="text-foreground font-semibold">Java programming</span> and <span className="text-foreground font-semibold">video editing</span>. My work has exposed me to diverse environments, including online team collaboration, on-site event production, and management, where I developed both general and platform-specific skills to advance my career.
                        </motion.p>
                    </motion.div>
                    <div className="mt-60 flex w-full justify-start">
                        <div className="flex flex-col items-end pr-4 flex-1 font-bold text-2xl">
                            WORK EXPERIENCE
                        </div>
                        <div className="relative">
                            <motion.div ref={targetRef} style={{ scaleY: draw, transformOrigin: "top" }} className="bg-highlight w-1 h-[200vh] rounded-full relative" />
                            <motion.div initial="hidden" whileInView="revealed" viewport={{ amount: 1, once: true }} className="pb-[25vh] -left-1.5 absolute top-0">
                                <motion.div variants={{ "hidden": { scale: 0 }, "revealed": { scale: 1 } }} className="aspect-square rounded-full w-4 h-4 border-[3px] border-highlight bg-background" />
                            </motion.div>
                        </div>
                        <div className="flex flex-col items-start pl-4 flex-1 font-bold text-2xl">
                            EDUCATION & CERTIFICATIONS
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex gap-8 items-start mt-6 max-md:flex-col">
            <div className="w-full">
                <h2 className="text-2xl text-highlight font-bold mb-2">Contact</h2>
                <div className="border-b mb-4"></div>
                <div className="flex items-center gap-2">
                <FaMobileAlt className="text-highlight" />
                <span className="flex-1">+63 927 973 4717</span>
                </div>
                <div className="h-2"></div>
                <div className="flex items-center gap-2">
                <IoMdMail className="text-highlight" />
                <span className="flex-1">waynegabule@gmail.com</span>
                </div>
                <div className="h-2"></div>
                <div className="flex items-center gap-2">
                <FaLinkedin className="text-highlight" />
                <span className="flex-1">linkedin.com/in/sean-waynegabule-083a481a6/</span>
                </div>
                <div className="my-6"></div>
                <h2 className="text-2xl text-highlight font-bold mb-2">Education</h2>
                <div className="border-b mb-4"></div>
                <div className="h-2"></div>
                <div>
                    <span className="text-sm align-bottom text-gray-400">2020 - 2024</span>
                    <h3 className="text-xl font-bold">
                    Ateneo de Davao University
                    </h3>
                    <span className="">College</span>
                    <ul className="mt-2 list-disc pl-5">
                        <li className="">Bachelor of Science in Information Technology</li>
                        <li className="">Consistent Honor Student</li>
                        <li className="">Scholar</li>
                        <li className="">President's Lister</li>
                    </ul>
                </div>
                <div className="h-2"></div>
                <div>
                    <span className="text-sm align-bottom text-gray-400">2018 - 2020</span>
                    <h3 className="text-xl font-bold">
                    Ateneo de Davao University
                    </h3>
                    <span className="">Senior High School</span>
                    <ul className="mt-2 list-disc pl-5">
                        <li className="">STEM Pre-Computer Studies</li>
                        <li className="">Consistent Honor Student</li>
                        <li className="">Scholar</li>
                    </ul>
                </div>
                <div className="h-2"></div>
                <div>
                    <span className="text-sm align-bottom text-gray-400">2013 - 2018</span>
                    <h3 className="text-xl font-bold">
                    Ateneo de Davao University
                    </h3>
                    <span className="">Junior High School</span>
                    <ul className="mt-2 list-disc pl-5">
                        <li className="">STEM Pre-Computer Studies</li>
                    </ul>
                </div>
                <div className="my-6"></div>
                <h2 className="text-2xl text-highlight font-bold mb-2">Skills</h2>
                <div className="border-b mb-4"></div>
                <div className="h-2"></div>
                <ul className="list-disc pl-5">
                <li className="">Flutter Web Development (2 years)</li>
                <li className="">Java Programming (4 years)</li>
                <li className="">Object-Oriented Programming (5 years)</li>
                <li className="">MySQL Database Management (5 years)</li>
                <li className="">Adobe After Effects (8 years)</li>
                <li className="">Adobe Photoshop (9 years)</li>
                <li className="">Adobe Illustrator (7 years)</li>
                <li className="">Videography</li>
                <li className="">Story Development</li>
                <li className="">Visual Effects</li>
                <li className="">Special Effects Understanding</li>
                <li className="">Multi-Camera Editing</li>
                <li className="">Syncing and Narration</li>
                </ul>
            </div>
            <div className="grow">
                <h2 className="text-2xl text-highlight font-bold mb-2">Profile</h2>
                <div className="border-b mb-4"></div>
                <p>
                I am a BS in Information
                Technology fresh graduate from the Ateneo de Davao University and have
                been freelancing in both Java Programming and Video
                Editing commissions in my spare times. Throughout my
                subsidiaries, I have been exposed to various working
                environments, ranging from online team planning and
                communication to on-site event production and management,
                and throughout these exposures, I am able to develop
                various general and platform-specific skills that would
                definitely help me with my careers.
                </p>
                <div className="my-8">
                    <h2 className="mb-2 text-highlight font-bold text-2xl">Work Experience</h2>
                    <div className="border-b mb-4"></div>
                    <div className="flex gap-4">
                        <div className="flex flex-col items-end">
                        <div className="bg-highlight w-px h-full rounded-full -translate-x-0.5"></div>
                        </div>
                        <div className="flex-grow">
                        <div className="h-2"></div>
                        {[
                            {
                            company: "Orange & Bronze",
                            year: "2024 - Present",
                            title: "Associate Engineer 1",
                            tasks: [
                                "Implement features under the guidance of more senior developers, and in compliance with company & client practices.",
                                "Allots time to learn software development practices & technologies as prescribed by the company and as needed by the client.",
                                "Contributes to ideas & plans of the team.",
                                "Coordinates directly with client counterparts.",
                            ],
                            },
                            {
                            company: "Freelance",
                            year: "2020 - Present",
                            title: "Java Plugin Developer",
                            tasks: [
                                "Developed plugins (add-ons and modifications) for games such as Minecraft.",
                                "Was able to work on and experience Java Programming and MySQL Database Management.",
                                "Honed necessary skills for Object-Oriented Programming and Complex Database Logic and Queries.",
                                "Presently and actively updating my developed plugins, allowing me to easily practice and sharpen my skills on a weekly basis.",
                            ],
                            },
                            {
                            company: "LAVA Automation",
                            year: "2023 - 2024",
                            title: "Videographer",
                            tasks: [
                                "In charge of all things video editing related, from video construction to motion graphic animation.",
                                "Helped create the company's current logo and have designed all of its animations, both 2D and 3D.",
                                "Made infographics, PowerPoints, and similar graphic visualizations mainly for company advertisements."
                            ],
                            },
                            {
                            company: "The Createneo",
                            year: "2020 - 2021",
                            title: "Motion Graphics Head",
                            tasks: [
                                "In charge of all things animated tasked to the team.",
                                "Achieved excellent, punctual work.",
                                "Allowed me to learn leadership, crew management, and more in-depth Motion Graphics skills.",
                            ],
                            },
                        ].map((experience, index) => (
                            <div key={index} className="mb-6">
                            <div className="flex items-center relative">
                                <div className="border-highlight bg-background border-2 -translate-x-6 w-3 h-3 rounded-full absolute"></div>
                                <h2 className="text-xl font-bold grow">{experience.company}</h2>
                                <span className="text-gray-400">{experience.year}</span>
                            </div>
                            <span className="">{experience.title}</span>
                            <ul className="mt-2 list-disc pl-5">
                                {experience.tasks.map((task, taskIndex) => (
                                <li key={taskIndex}>{task}</li>
                                ))}
                            </ul>
                            </div>
                        ))}
                        </div>
                    </div>
                    </div>
                    <div className="my-8">
                    <h2 className="mb-2 text-highlight font-bold text-2xl">Portfolios</h2>
                    <div className="border-b mb-4"></div>
                    <div className="flex gap-6 justify-between">
                        {[
                        {
                            id: "wg-card",
                            image: "images/coralreef.jpg",
                            title: "WG Portfolio",
                            link: "https://wg-portfolio.vercel.app/",
                        },
                        {
                            id: "bh-card",
                            image: "images/behance.svg",
                            title: "Behance Portfolio",
                            link: "https://www.behance.net/alphazed1",
                        },
                        {
                            id: "this-card",
                            image: "images/logo.png",
                            title: "This Portfolio",
                            link: "portfolio",
                        },
                        ].map((portfolio, index) => (
                            <Card key={index} text={portfolio.title} href={portfolio.link}>
                                <img src={portfolio.image} className="w-full h-full object-contain rounded-2xl" />
                            </Card>
                        // <div
                        //     key={index}
                        //     id={portfolio.id}
                        //     className="bg-white shadow-md hover:scale-105 transform transition rounded-lg p-4 flex flex-col items-center"
                        // >
                        //     <div className="flex flex-1 items-center justify-center">
                        //     <img
                        //         src={portfolio.image}
                        //         alt={portfolio.title}
                        //         className="w-24 h-24 rounded-full object-cover"
                        //     />
                        //     </div>
                        //     <h3 className="mt-4 text-lg text-center font-semibold">{portfolio.title}</h3>
                        //     <button
                        //     className="mt-4 bg-highlight text-white py-1 px-4 rounded-sm shadow-sm hover:bg-blue-700"
                        //     >
                        //     Visit
                        //     </button>
                        // </div>
                        ))}
                    </div>
                </div>
            </div>
            </div>
        </div>
    );
}