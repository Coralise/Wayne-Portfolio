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
    <div className="h-fit min-h-screen">
      <Particles
        id="tsparticles"
        particlesLoaded={particlesLoaded}
        options={options}
      />

      <div className="h-[300vh] dbg">
        Test Div
      </div>
    </div>
  );
}
