"use client";

import { motion, AnimatePresence } from "motion/react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import { useEffect, useMemo, useState, useCallback } from "react";
import FrostedCard from "./components/frosted-card";
import Tag from "./components/tag";
import { HiExternalLink } from "react-icons/hi";
import { MdEmail } from "react-icons/md";
import { FaPhone } from "react-icons/fa6";
import { FaDiscord, FaGithubAlt, FaRegStar, FaStar, FaStarHalfAlt, FaReact, FaFigma, FaWhatsapp } from "react-icons/fa";
import { RiJavaLine, RiFlutterFill } from "react-icons/ri";
import { SiSpringboot, SiLua, SiAdobeaftereffects, SiAdobephotoshop, SiAdobeillustrator, SiAdobepremierepro, SiCanva, SiNextdotjs, SiFirebase } from "react-icons/si";
import { TbBrandMysql } from "react-icons/tb";

export default function Home() {

  const [init, setInit] = useState(false);
  const [showContent, setShowContent] = useState(false);

  // this should be run only once per application lifetime
  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  useEffect(() => {
    // Check localStorage on client side only
    const hasVisited = localStorage.getItem('hasVisited') === 'true';
    
    if (hasVisited) {
      // Already visited - skip intro
      setShowContent(true);
      return;
    }
    
    // First visit - show intro then transition
    const timer = setTimeout(() => {
      setShowContent(true);
      localStorage.setItem('hasVisited', 'true');
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  // Handle hash navigation - wait for element to exist in DOM
  useEffect(() => {
    const hash = window.location.hash;
    if (hash !== '#portfolio-section') return;

    // Check if element already exists
    const element = document.getElementById('portfolio-section');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      return;
    }

    // Watch for element to appear in DOM
    const observer = new MutationObserver(() => {
      const el = document.getElementById('portfolio-section');
      if (el) {
        observer.disconnect();
        el.scrollIntoView({ behavior: 'smooth' });
      }
    });

    observer.observe(document.body, { childList: true, subtree: true });

    // Cleanup
    return () => observer.disconnect();
  }, [showContent]);

  const particlesLoaded = useCallback((container) => {
    console.log(container);
  }, []);

  const options = useMemo(() => ({
    "particles": {
      "number": {
        "value": 14,
        "density": {
          "enable": false,
          "value_area": 800
        }
      },
      "color": {
        "value": "#ff3b3f"
      },
      "shape": {
        "type": "circle",
        "stroke": {
          "width": 0,
          "color": "#000000"
        },
        "polygon": {
          "nb_sides": 5
        },
        "image": {
          "src": "img/github.svg",
          "width": 100,
          "height": 100
        }
      },
      "opacity": {
        "value": 0.5,
        "random": false,
        "anim": {
          "enable": false,
          "speed": 1,
          "opacity_min": 0.1,
          "sync": false
        }
      },
      "size": {
        "value": 2,
        "random": true,
        "anim": {
          "enable": true,
          "speed": 2.430783441503198,
          "size_min": 0.1,
          "sync": false
        }
      },
      "line_linked": {
        "enable": false,
        "distance": 150,
        "color": "#ffffff",
        "opacity": 0.4,
        "width": 1
      },
      "move": {
        "enable": true,
        "speed": 1.5,
        "direction": "top-right",
        "random": false,
        "straight": false,
        "out_mode": "out",
        "bounce": false,
        "attract": {
          "enable": false,
          "rotateX": 600,
          "rotateY": 1200
        }
      }
    },
    "interactivity": {
      "detect_on": "canvas",
      "events": {
        "onhover": {
          "enable": true,
          "mode": "bubble"
        },
        "onclick": {
          "enable": true,
          "mode": "push"
        },
        "resize": true
      },
      "modes": {
        "grab": {
          "distance": 400,
          "line_linked": {
            "opacity": 1
          }
        },
        "bubble": {
          "distance": 400,
          "size": 2,
          "duration": 2,
          "opacity": 8,
          "speed": 3
        },
        "repulse": {
          "distance": 200,
          "duration": 0.4
        },
        "push": {
          "particles_nb": 4
        },
        "remove": {
          "particles_nb": 2
        }
      }
    },
    "retina_detect": true
  }), []);

  return (
    <div className="h-fit min-h-screen">
      <Particles
        id="tsparticles"
        particlesLoaded={particlesLoaded}
        options={options}
      />
      <div className="min-h-screen flex justify-center py-[25vh]">
        <AnimatePresence mode="wait">
          {showContent ? (
            <motion.div
              key="content"
              initial="hidden"
              animate="visible"
              variants={{
                hidden: {},
                visible: {
                  transition: {
                    staggerChildren: 0.15
                  }
                }
              }}
              className="gap-4 grid grid-cols-1 lg:grid-cols-4 xl:w-2/3 max-xl:w-full px-4"
            >
              <FrostedCard className="lg:col-span-3 grid grid-cols-3 gap-2 group">
                <header className="flex gap-4 items-center col-span-2">
                  <div className="h-2 w-10 rounded-lg bg-[#C082D2]" />
                  <span className="text-lg font-bold">Contact</span>
                </header>
                <a href="/resume" className="flex justify-end items-center">
                  <span className="text-end flex items-center justify-end gap-1 text-foreground-2nd w-fit link hover:after:w-full max-lg:text-highlighter-2nd group-hover:text-highlighter-2nd">
                    <span className="max-lg:opacity-100 opacity-0 group-hover:opacity-100 transition-opacity duration-500">View Resume</span>
                    <HiExternalLink className="text-lg transition-all duration-500" />
                  </span>
                </a>
                <img src="/images/winnie.png" className="p-4 w-[25vh] aspect-square rounded-full object-cover md:col-span-1 max-md:col-span-3 place-self-center" />
                <div className="md:col-span-2 max-md:col-span-3 flex flex-col justify-center max-md:items-center max-md:text-center">
                  <span className="text-2xl font-bold font-sour-gummy text-transparent bg-clip-text bg-gradient-to-tl from-white to-[#C082D2]">Sean Wayne Gabule</span>
                  <span className="font-sour-gummy text-foreground flex gap-2 items-center">Full-Stack Developer | Motion Graphic Designer</span>
                  <span className="text-foreground-2nd flex gap-2 items-center mt-2"><MdEmail />waynegabule@gmail.com</span>
                  <span className="text-foreground-2nd flex gap-2 items-center"><FaWhatsapp />(+63) 927-973-4717</span>
                  <div className="mt-2 flex gap-2">
                    <a href="https://discord.com/users/254225248889602048" target="_blank" className="flex w-fit p-2 bg-neutral-400 rounded-lg transition-all duration-500 hover:bg-transparent text-background hover:text-[#7289da] shadow-[transparent_0px_0px_5px_4px] hover:shadow-[#7289da_0px_0px_5px_4px]">
                        <FaDiscord className="size-4" />
                    </a>
                    <a href="https://github.com/Coralise" target="_blank" className="flex w-fit p-2 bg-neutral-400 rounded-lg transition-all duration-500 hover:bg-transparent text-background hover:text-[#6e5494] shadow-[transparent_0px_0px_5px_4px] hover:shadow-[#6e5494_0px_0px_5px_4px]">
                        <FaGithubAlt className="size-4" />
                    </a>
                  </div>
                </div>
                <div className="absolute w-[15px] h-[15px] bottom-4 right-4 bg-[#C082D2] max-lg:opacity-100 opacity-30 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute w-[10px] h-[10px] bottom-9 right-6 bg-[#C082D2] max-lg:opacity-100 opacity-30 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute w-[5px] h-[5px] bottom-6 right-9 bg-[#C082D2] max-lg:opacity-100 opacity-30 group-hover:opacity-100 transition-opacity duration-500" />
              </FrostedCard>
              <FrostedCard className="lg:row-span-2 grid grid-cols-2 gap-2 items-start content-start group">
                <header className="flex gap-4 items-center">
                  <div className="h-2 w-10 rounded-lg bg-highlight" />
                  <span className="text-lg font-bold">Skills</span>
                </header>
                <a href="/resume" className="flex justify-end items-center">
                  <span className="text-end flex items-center justify-end gap-1 text-foreground-2nd w-fit link hover:after:w-full max-lg:text-highlighter-2nd group-hover:text-highlighter-2nd">
                    <span className="max-lg:opacity-100 opacity-0 group-hover:opacity-100 transition-all duration-500">View more</span>
                    <HiExternalLink className="text-lg transition-all duration-500" />
                  </span>
                </a>
                <span className="place-self-start col-span-2 mt-4 font-bold text-lg max-lg:text-highlight group-hover:text-highlight transition-colors duration-500">Programming</span>
                <div className="col-span-2 grid grid-cols-2 gap-1">
                  <div className="flex items-center gap-1"><RiJavaLine /> Java</div>
                  <div className="flex items-center gap-1"><SiSpringboot /> Spring Boot</div>
                  <div className="flex items-center gap-1"><TbBrandMysql /> MySQL</div>
                  <div className="flex items-center gap-1"><FaReact /> ReactJS</div>
                  <div className="flex items-center gap-1"><SiLua /> Lua</div>
                  <div className="flex items-center gap-1"><FaFigma /> Figma</div>
                </div>
                <span className="place-self-start col-span-2 mt-4 font-bold text-lg max-lg:text-highlight group-hover:text-highlight transition-colors duration-500">Motion Graphics</span>
                <div className="col-span-2 grid grid-cols-2 gap-1">
                  <div className="flex items-center gap-1"><SiAdobeaftereffects /> After Effects</div>
                  <div className="flex items-center gap-1"><SiAdobephotoshop /> Photoshop</div>
                  <div className="flex items-center gap-1"><SiAdobeillustrator /> Illustrator</div>
                  <div className="flex items-center gap-1"><SiAdobepremierepro /> Premiere Pro</div>
                  <div className="flex items-center gap-1"><SiCanva /> Canva</div>
                </div>
              </FrostedCard>
              <FrostedCard className="grid grid-cols-2 gap-2 group">
                <header className="flex gap-4 items-center col-span-2 place-self-start">
                  <div className="h-2 w-10 rounded-lg bg-[#47cf5e]" />
                  <span className="text-lg font-bold">Communication</span>
                </header>
                <div className="flex gap-1 items-center">Filipino</div>
                <div className="flex gap-1 items-center max-lg:text-[#47cf5e] group-hover:text-[#47cf5e] transition-colors duration-500"><FaStar /><FaStar /><FaStar /><FaStar /><FaStar /></div>
                <div className="flex gap-1 items-center">Written English</div>
                <div className="flex gap-1 items-center max-lg:text-[#47cf5e] group-hover:text-[#47cf5e] transition-colors duration-500"><FaStar /><FaStar /><FaStar /><FaStar /><FaStarHalfAlt /></div>
                <div className="flex gap-1 items-center">Spoken English</div>
                <div className="flex gap-1 items-center max-lg:text-[#47cf5e] group-hover:text-[#47cf5e] transition-colors duration-500"><FaStar /><FaStar /><FaStar /><FaStar /><FaRegStar /></div>
              </FrostedCard>
              <FrostedCard className="lg:col-span-2 flex flex-col gap-2 group">
                <header className="flex gap-4 items-center place-self-start">
                  <div className="h-2 w-10 rounded-lg bg-[#f8b248]" />
                  <span className="text-lg font-bold">About me</span>
                </header>
                <p className="indent-4">
                  I am a BS in Information Technology graduate from Ateneo de Davao University with freelance experience in Java programming and video editing. I strive to excel in these fields, including motion graphics design, front-end development, and many more.
                </p>
              </FrostedCard>
              <FrostedCard className="lg:col-span-2 gap-2 group flex flex-col">
                <header className="flex justify-between items-center w-full">
                  <div className="flex gap-4 items-center">
                    <div className="h-2 w-10 rounded-lg bg-[#3498db]" />
                    <span className="text-lg font-bold">Work Experience</span>
                  </div>
                  <a href="/resume" className="flex items-center">
                    <span className="text-end flex items-center justify-end gap-1 text-foreground-2nd w-fit link hover:after:w-full max-lg:text-highlighter-2nd group-hover:text-highlighter-2nd">
                      <span className="max-lg:opacity-100 opacity-0 group-hover:opacity-100 transition-opacity duration-500">View Resume</span>
                      <HiExternalLink className="text-lg transition-all duration-500" />
                    </span>
                  </a>
                </header>
                <div className="flex flex-col gap-3 mt-2">
                  <div className="relative overflow-hidden rounded-xl bg-background/30 backdrop-blur-sm border-foreground-2nd/20 p-4 hover:border-[#3498db]/50 transition-all duration-300">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <span className="text-sm font-bold text-foreground">Video Editor</span>
                        <span className="text-xs text-foreground-2nd block">Hyre</span>
                      </div>
                      <span className="text-xs text-[#3498db] font-medium">January 2026 - Present</span>
                    </div>
                    <p className="text-xs text-foreground-2nd">
                      Edited video content and created motion graphics to support brand identity and digital campaigns.
                    </p>
                    <div className="flex gap-1 mt-2 flex-wrap">
                      <Tag text="After Effects" icon="aftereffects" color="#3498db" />
                      <Tag text="Premiere Pro" icon="premierepro" color="#3498db" />
                      <Tag text="Motion Graphics" icon="sparkles" color="#3498db" />
                    </div>
                  </div>
                  <div className="relative overflow-hidden rounded-xl bg-background/30 backdrop-blur-sm border-foreground-2nd/20 p-4 hover:border-[#3498db]/50 transition-all duration-300">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <span className="text-sm font-bold text-foreground">Associate Engineer 1</span>
                        <span className="text-xs text-foreground-2nd block">Orange & Bronze</span>
                      </div>
                      <span className="text-xs text-[#3498db] font-medium">July 2024 - December 2025</span>
                    </div>
                    <p className="text-xs text-foreground-2nd">Implement features under guidance of senior developers, in compliance with company & client practices.</p>
                    <div className="flex gap-1 mt-2 flex-wrap">
                      <Tag text="Java" icon="java" color="#3498db" />
                      <Tag text="Spring Boot" icon="springboot" color="#3498db" />
                    </div>
                  </div>
                  <div className="relative overflow-hidden rounded-xl bg-background/30 backdrop-blur-sm border-foreground-2nd/20 p-4 hover:border-[#3498db]/50 transition-all duration-300">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <span className="text-sm font-bold text-foreground">Admin/Video Editor</span>
                        <span className="text-xs text-foreground-2nd block">Lava Automation</span>
                      </div>
                      <span className="text-xs text-[#3498db] font-medium">Mar 2023 - Dec 2024</span>
                    </div>
                    <p className="text-xs text-foreground-2nd">In charge of video editing, motion graphics animation, and company logo design.</p>
                    <div className="flex gap-1 mt-2 flex-wrap">
                      <Tag text="After Effects" icon="aftereffects" color="#3498db" />
                      <Tag text="Premiere Pro" icon="premierepro" color="#3498db" />
                    </div>
                  </div>
                </div>
              </FrostedCard>
              <FrostedCard className="lg:col-span-2 gap-2 group flex flex-col">
                <header className="flex justify-between items-center w-full">
                  <div className="flex gap-4 items-center">
                    <div className="h-2 w-10 rounded-lg bg-[#2ecc71]" />
                    <span className="text-lg font-bold">Education & Certifications</span>
                  </div>
                  <a href="/resume" className="flex items-center">
                    <span className="text-end flex items-center justify-end gap-1 text-foreground-2nd w-fit link hover:after:w-full max-lg:text-highlighter-2nd group-hover:text-highlighter-2nd">
                      <span className="max-lg:opacity-100 opacity-0 group-hover:opacity-100 transition-opacity duration-500">View Resume</span>
                      <HiExternalLink className="text-lg transition-all duration-500" />
                    </span>
                  </a>
                </header>
                <div className="flex flex-col gap-3 mt-2">
                  <div className="relative overflow-hidden rounded-xl bg-background/30 backdrop-blur-sm border-foreground-2nd/20 p-4 hover:border-[#2ecc71]/50 transition-all duration-300">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <span className="text-sm font-bold text-foreground">BS Information Technology</span>
                        <span className="text-xs text-foreground-2nd block">Ateneo de Davao University College</span>
                      </div>
                      <span className="text-xs text-[#2ecc71] font-medium">2020 - 2024</span>
                    </div>
                    <div className="flex gap-1 mt-2 flex-wrap">
                      <Tag text="Honor Student" color="#2ecc71" />
                      <Tag text="Scholar" color="#2ecc71" />
                      <Tag text="President's Lister" color="#2ecc71" />
                    </div>
                  </div>
                  <div className="relative overflow-hidden rounded-xl bg-background/30 backdrop-blur-sm border-foreground-2nd/20 p-4 hover:border-[#2ecc71]/50 transition-all duration-300">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <span className="text-sm font-bold text-foreground">Java Fundamentals</span>
                        <span className="text-xs text-foreground-2nd block">Orange & Bronze</span>
                      </div>
                      <span className="text-xs text-[#2ecc71] font-medium">June 2025</span>
                    </div>
                    <p className="text-xs text-foreground-2nd">Enterprise Java development, OOP design patterns, and coding standards.</p>
                    <div className="flex gap-1 mt-2 flex-wrap">
                      <Tag text="Java" icon="java" color="#2ecc71" />
                    </div>
                  </div>
                  <div className="relative overflow-hidden rounded-xl bg-background/30 backdrop-blur-sm border-foreground-2nd/20 p-4 hover:border-[#2ecc71]/50 transition-all duration-300">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <span className="text-sm font-bold text-foreground">TOPCIT Level 3</span>
                        <span className="text-xs text-foreground-2nd block">IITP Korea</span>
                      </div>
                      <span className="text-xs text-[#2ecc71] font-medium">April 2024</span>
                    </div>
                    <p className="text-xs text-foreground-2nd">Scored in the top 30% nationally, exceeding the country average by 140%.</p>
                    <div className="flex gap-1 mt-2 flex-wrap">
                      <Tag text="IT Competency" color="#2ecc71" />
                      <Tag text="Top 30%" color="#2ecc71" />
                    </div>
                  </div>
                </div>
                <a href="/resume" className="text-foreground-2nd text-sm mt-2 flex items-center gap-1 hover:text-highlighter-2nd transition-colors duration-300">
                  <span>+4 more certifications</span>
                  <HiExternalLink className="text-sm" />
                </a>
              </FrostedCard>
              <FrostedCard id="portfolio-section" className="lg:col-span-4 gap-2 group flex flex-col">
                <header className="flex justify-between items-center w-full">
                  <div className="flex gap-4 items-center">
                    <div className="h-2 w-10 rounded-lg bg-highlighter-2nd" />
                    <span className="text-lg font-bold">Programming Portfolio</span>
                  </div>
                  <a href="/programming-portfolio" className="flex items-center">
                  <span className="text-end flex items-center justify-end gap-1 text-foreground-2nd w-fit link hover:after:w-full max-lg:text-highlighter-2nd group-hover:text-highlighter-2nd">
                      <span className="max-lg:opacity-100 opacity-0 group-hover:opacity-100 transition-opacity duration-500">View all</span>
                      <HiExternalLink className="text-lg transition-all duration-500" />
                    </span>
                  </a>
                </header>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-2">
                  <a href="/programming-portfolio#jedis" className="group/project relative overflow-hidden rounded-xl bg-background/30 backdrop-blur-sm border-foreground-2nd/20 p-3 flex flex-col gap-2 hover:border-highlighter-2nd/50 transition-all duration-300">
                    <img src="/images/jedis.jpg" alt="Jedis" className="w-full aspect-video object-cover rounded-lg transition-transform duration-500 group-hover/project:scale-105" />
                    <div className="flex flex-col gap-1">
                      <span className="text-sm font-bold text-foreground">Jedis</span>
                      <span className="text-xs text-foreground-2nd line-clamp-2">Redis-like in-memory datastore built from scratch in Java</span>
                      <div className="flex gap-1 mt-1 flex-wrap">
                        <Tag text="Java" icon="java" color="#00d4ff" />
                      </div>
                    </div>
                  </a>
                  <a href="/programming-portfolio#bean-s-spelling-bee-helper" className="group/project relative overflow-hidden rounded-xl bg-background/30 backdrop-blur-sm border-foreground-2nd/20 p-3 flex flex-col gap-2 hover:border-highlighter-2nd/50 transition-all duration-300">
                    <img src="/images/rsb/rsb1.png" alt="Spelling Bee Helper" className="w-full aspect-video object-cover rounded-lg transition-transform duration-500 group-hover/project:scale-105" />
                    <div className="flex flex-col gap-1">
                      <span className="text-sm font-bold text-foreground">Spelling Bee Helper</span>
                      <span className="text-xs text-foreground-2nd line-clamp-2">Practice tool & random-word API for Roblox Spelling Bee</span>
                      <div className="flex gap-1 mt-1 flex-wrap">
                        <Tag text="Next.js" icon="nextjs" color="#00d4ff" />
                        <Tag text="React" icon="react" color="#00d4ff" />
                      </div>
                    </div>
                  </a>
                  <a href="/programming-portfolio#mandog-driving" className="group/project relative overflow-hidden rounded-xl bg-background/30 backdrop-blur-sm border-foreground-2nd/20 p-3 flex flex-col gap-2 hover:border-highlighter-2nd/50 transition-all duration-300">
                    <img src="/images/mandog-driving/g1.png" alt="Mandog Driving" className="w-full aspect-video object-cover rounded-lg transition-transform duration-500 group-hover/project:scale-105" />
                    <div className="flex flex-col gap-1">
                      <span className="text-sm font-bold text-foreground">Mandog Driving</span>
                      <span className="text-xs text-foreground-2nd line-clamp-2">Driver's License Exam Reviewer for Japan</span>
                      <div className="flex gap-1 mt-1 flex-wrap">
                        <Tag text="Flutter" icon="flutter" color="#00d4ff" />
                        <Tag text="Firebase" icon="firebase" color="#00d4ff" />
                      </div>
                    </div>
                  </a>
                </div>
                <a href="/programming-portfolio" className="text-foreground-2nd text-sm mt-2 flex items-center gap-1 hover:text-highlighter-2nd transition-colors duration-300">
                  <span>+5 more projects</span>
                  <HiExternalLink className="text-sm" />
                </a>
              </FrostedCard>
              <FrostedCard className="lg:col-span-4 gap-2 group flex flex-col">
                <header className="flex justify-between items-center w-full">
                  <div className="flex gap-4 items-center">
                    <div className="h-2 w-10 rounded-lg bg-[#9b59b6]" />
                    <span className="text-lg font-bold">Motion Graphics Portfolio</span>
                  </div>
                  <a href="/motion-graphics-portfolio" className="flex items-center">
                  <span className="text-end flex items-center justify-end gap-1 text-foreground-2nd w-fit link hover:after:w-full max-lg:text-highlighter-2nd group-hover:text-highlighter-2nd">
                      <span className="max-lg:opacity-100 opacity-0 group-hover:opacity-100 transition-opacity duration-500">View all</span>
                      <HiExternalLink className="text-lg transition-all duration-500" />
                    </span>
                  </a>
                </header>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-2">
                  <a href="/motion-graphics-portfolio#motion-graphics" className="group/video relative overflow-hidden rounded-xl bg-background/30 backdrop-blur-sm border-foreground-2nd/20 p-3 flex flex-col gap-2 hover:border-[#9b59b6]/50 transition-all duration-300">
                    <div className="relative w-full aspect-video rounded-lg overflow-hidden">
                      <img src="https://img.youtube.com/vi/ynktyH9hB1E/mqdefault.jpg" alt="Motion Graphics Showreel" className="w-full h-full object-cover transition-transform duration-500 group-hover/video:scale-105" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center group-hover/video:bg-[#9b59b6]/80 transition-colors duration-300">
                          <div className="w-0 h-0 border-t-[8px] border-t-transparent border-l-[12px] border-l-white border-b-[8px] border-b-transparent ml-1" />
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col gap-1">
                      <span className="text-sm font-bold text-foreground">Motion Graphics Showreel</span>
                      <span className="text-xs text-foreground-2nd line-clamp-2">Compilation of animated visuals, kinetic typography & VFX work</span>
                      <div className="flex gap-1 mt-1 flex-wrap">
                        <Tag text="After Effects" icon="aftereffects" color="#9b59b6" />
                      </div>
                    </div>
                  </a>
                  <a href="/motion-graphics-portfolio#logo-animations" className="group/video relative overflow-hidden rounded-xl bg-background/30 backdrop-blur-sm border-foreground-2nd/20 p-3 flex flex-col gap-2 hover:border-[#9b59b6]/50 transition-all duration-300">
                    <div className="relative w-full aspect-video rounded-lg overflow-hidden">
                      <img src="https://img.youtube.com/vi/9PwLL1MZO8Q/mqdefault.jpg" alt="Logo Animation" className="w-full h-full object-cover transition-transform duration-500 group-hover/video:scale-105" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center group-hover/video:bg-[#9b59b6]/80 transition-colors duration-300">
                          <div className="w-0 h-0 border-t-[8px] border-t-transparent border-l-[12px] border-l-white border-b-[8px] border-b-transparent ml-1" />
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col gap-1">
                      <span className="text-sm font-bold text-foreground">Logo Animation</span>
                      <span className="text-xs text-foreground-2nd line-clamp-2">Sleek animated logo reveal with dynamic motion & lighting effects</span>
                      <div className="flex gap-1 mt-1 flex-wrap">
                        <Tag text="After Effects" icon="aftereffects" color="#9b59b6" />
                        <Tag text="Illustrator" icon="illustrator" color="#9b59b6" />
                      </div>
                    </div>
                  </a>
                  <a href="/motion-graphics-portfolio#typography" className="group/video relative overflow-hidden rounded-xl bg-background/30 backdrop-blur-sm border-foreground-2nd/20 p-3 flex flex-col gap-2 hover:border-[#9b59b6]/50 transition-all duration-300">
                    <div className="relative w-full aspect-video rounded-lg overflow-hidden">
                      <img src="https://img.youtube.com/vi/XU4ZbQjpGdU/mqdefault.jpg" alt="Typography Animation" className="w-full h-full object-cover transition-transform duration-500 group-hover/video:scale-105" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center group-hover/video:bg-[#9b59b6]/80 transition-colors duration-300">
                          <div className="w-0 h-0 border-t-[8px] border-t-transparent border-l-[12px] border-l-white border-b-[8px] border-b-transparent ml-1" />
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col gap-1">
                      <span className="text-sm font-bold text-foreground">Kinetic Typography</span>
                      <span className="text-xs text-foreground-2nd line-clamp-2">Dynamic text animation synced to audio with expressive motion</span>
                      <div className="flex gap-1 mt-1 flex-wrap">
                        <Tag text="After Effects" icon="aftereffects" color="#9b59b6" />
                      </div>
                    </div>
                  </a>
                </div>
                <a href="/motion-graphics-portfolio" className="text-foreground-2nd text-sm mt-2 flex items-center gap-1 hover:text-highlighter-2nd transition-colors duration-300">
                  <span>+30 more videos</span>
                  <HiExternalLink className="text-sm" />
                </a>
              </FrostedCard>
            </motion.div>
          ) : (
            <motion.div
              key="intro"
              initial={{
                opacity: 0,
                y: 100,
                filter: "blur(5px)"
              }}
              animate={{
                opacity: 1,
                y: 0,
                filter: "blur(0px)"
              }}
              exit={{
                opacity: 0,
                y: -100,
                transition: {
                  ease: [.6,0,.9,.2],
                  duration: .75
                }
              }}
              transition={{
                ease: [.1,.8,.4,1],
                duration: .75
              }}
              className="text-6xl font-black z-10 mb-3 font-sour-gummy flex flex-col items-center"
            >
              <span className="text-transparent bg-clip-text bg-gradient-to-tl from-white to-[#797979]">Hello!</span>
              <span className="text-base font-barlow font-normal">I'm Wayne.</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}