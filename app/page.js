"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { delay } from "motion";
import Card3D from "./components/3d-card";
import Card from "./components/card";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

export default function Home() {

  const [init, setInit] = useState(false);

  // this should be run only once per application lifetime
  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  // Handle hash navigation
  useEffect(() => {
    const handleHashNavigation = () => {
      const hash = window.location.hash;
      if (hash === '#portfolio-section') {
        const element = document.getElementById('portfolio-section');
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    };

    // Check on mount
    handleHashNavigation();

    // Listen for hash changes
    window.addEventListener('hashchange', handleHashNavigation);

    return () => {
      window.removeEventListener('hashchange', handleHashNavigation);
    };
  }, []);

  const particlesLoaded = (container) => {
    console.log(container);
  };

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

  const defaultTransition = {
      duration: .5
  }

  const revealLeft = {
    "rest": {
      opacity: 0,
      x: 40
    },
    "revealed": {
      opacity: 1,
      x: 0
    }
  }

  return (
    <div className="snap-y snap-mandatory h-screen overflow-y-scroll ml-[5px] hidden-scrollbar">
      <Particles
        id="tsparticles"
        particlesLoaded={particlesLoaded}
        options={options}
      />
      <div className="h-screen snap-center place-content-center overflow-y-scroll">
        <motion.div
        initial="rest"
        whileHover="revealed"
        transition={{...defaultTransition,
          duration: .75,
          staggerChildren: 0.01
        }}
        className="w-fit relative m-auto select-none">
          <div className="bg-highlighter h-28 w-96 m-auto blur-3xl bg-opacity-20 absolute z-0 -left-32 motion-preset-fade-lg" />
          <motion.div
            initial={{
              x: -25,
              opacity: 0,
              filter: "blur(5px)"
            }}
            animate={{
              x: 0,
              opacity: 1,
              filter: "blur(0px)",
              transition: {
                default: {
                  ease: "circOut",
                  duration: .75
                },
                filter: {
                  duration: .5
                },
                opacity: {
                  duration: .5
                }
              }
            }}
            viewport={{
              once: true
            }}
            className="relative text-7xl font-black z-10 mb-3 font-sour-gummy">Hey!</motion.div>
          <motion.div
            viewport={{
              once: true
            }}
            className="relative text-3xl z-10">I'm <span className="text-highlight font-extrabold">Wen</span>
          </motion.div>
        </motion.div>
      </div>
      <div className="h-screen snap-start flex gap-3 flex-col items-center overflow-y-hidden pt-32" id="portfolio-section">
        <motion.div
          initial={{ opacity: 0, filter: "blur(5px)", y: -100 }}
          whileInView={{ opacity: 1, filter: "blur(0px)", y: 0,
            transition: { 
              default: { duration: 1, ease: "circOut" },
              filter: { duration: .5 },
              opacity: { duration: .5 }
            }
          }}
          viewport={{
            once: true
          }}
          className="text-foreground-2nd text-sm"
        >Which would you like to know about me?</motion.div>
        <motion.div
          initial={{ opacity: 0, transform: "translate3d(0, -100px, 0) rotateX(60deg)" }}
          whileInView={{ opacity: 1, transform: "translate3d(0, 0px, 0) rotateX(0deg)" }}
          transition={{ duration: 1, delay: .75, ease: "easeOut" }}
          viewport={{
            once: true
          }}
          className="flex gap-20 perspective max-md:hidden relative"
        >
          <Card3D href="/programming-portfolio" text="Programming Portfolio">
            <img src="images/programming.jpg" className="w-full h-full object-cover rounded-2xl" />
          </Card3D>
          <Card3D href="/resume" text="Resume">
            <img src="images/winnie.png" className="w-full h-full object-cover rounded-2xl" />
          </Card3D>
          <Card3D href="/motion-graphics-portfolio" text="Motion Graphics Portfolio">
            <video 
              src="endgame.webm" 
              autoPlay 
              loop 
              muted 
              className="pointer-events-none w-full h-full object-cover rounded-2xl"
            ></video>
          </Card3D>
          <div className="absolute bg-highlighter blur-3xl w-full h-12 rounded-full opacity-75" style={{
            top: "calc(100% - 2rem)"
          }} />
        </motion.div>
        <div className="md:hidden flex flex-col gap-7 w-full items-center">
          <Link className="w-full" href={"/programming-portfolio"}>
            <img src="images/programming.jpg" className="w-full h-40 object-cover rounded-2xl" />
            <p className="text-center">Programming Portfolio</p>
          </Link>
          <Link className="w-full" href={"/resume"}>
            <img src="images/winnie.png" className="w-full h-40 object-cover rounded-2xl" />
            <p className="text-center">Resume</p>
          </Link>
          <Link className="w-full h-40" href={"/motion-graphics-portfolio"}>
            <video 
              src="endgame.webm" 
              autoPlay 
              loop 
              muted 
              className="pointer-events-none w-full h-full object-cover rounded-2xl"
            ></video>
            <p className="text-center">Motion Graphics Portfolio</p>
          </Link>
        </div>
      </div>
    </div>
  );
}
