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
    <div className="snap-y snap-mandatory h-screen overflow-y-scroll hidden-scrollbar">
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
            className="relative text-3xl z-10">I'm <span className="text-highlight font-extrabold">Sean <span className="max-md:hidden">{ "Wayne Gabule".split("").map((c, i) => (
              <motion.span key={i} variants={revealLeft} transition={{duration: .5, type: "spring"}} className={`inline-block ${c !== " " ? "" : "pl-2"}`}>{c}</motion.span>
            )) }</span><span className="md:hidden">Wayne Gabule</span></span>
          </motion.div>
        </motion.div>
      </div>
      <div className="h-screen snap-start flex gap-3 flex-col items-center overflow-y-scroll pt-32">
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
        className="flex gap-20 perspective max-md:hidden relative">
          <Card3D href="/portfolio" text="Programming">
            <img src="images/programming.jpg" className="w-full h-full object-cover rounded-2xl" />
          </Card3D>
          <Card3D href="/portfolio" text="Motion Graphics">
            <img src="images/Logo.gif" className="w-full h-full object-cover rounded-2xl" />
          </Card3D>
          <div className="absolute bg-highlighter blur-3xl w-full h-12 rounded-full opacity-75" style={{
            top: "calc(100% - 2rem)"
          }} />
        </motion.div>
        <div className="md:hidden flex flex-col gap-7 w-full items-center">
          <Link className="w-full" href={"/portfolio"}>
            <img src="images/programming.jpg" className="w-full h-40 object-cover rounded-2xl" />
            <p className="text-center">Programming</p>
          </Link>
          <Link className="w-full" href={"/portfolio"}>
            <img src="images/Logo.gif" className="w-full h-40 object-cover rounded-2xl" />
            <p className="text-center">Motion Graphics</p>
          </Link>
        </div>
      </div>
    </div>
  );
}
