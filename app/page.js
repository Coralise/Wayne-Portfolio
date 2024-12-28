"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { delay } from "motion";
import Card3D from "./components/3dCard";
import Card from "./components/Card";

export default function Home() {

  return (
    <div className="snap-y snap-mandatory h-screen overflow-y-scroll hidden-scrollbar">
      <div className="h-screen snap-center place-content-center">
        <div className="w-fit relative m-auto">
          <div className="bg-red h-28 w-96 m-auto blur-3xl bg-opacity-20 absolute z-0 -left-32 motion-preset-fade-lg" />
          <motion.div initial={{ x: -25, opacity: 0, filter: "blur(5px)" }} animate={{ x: 0, opacity: 1, filter: "blur(0px)", transition: { default: { ease: "circOut", duration: .75 }, filter: { duration: .5 } , opacity: { duration: .5 } } }} className="relative text-7xl font-bold z-10 mb-3">'Sup?</motion.div>
          <motion.div initial={{ x: -25, opacity: 0, filter: "blur(5px)" }} animate={{ x: 0, opacity: 1, filter: "blur(0px)", transition: { default: { ease: "circOut", duration: 1 }, filter: { duration: .75 } , opacity: { duration: .75 } } }} className="relative text-3xl z-10 motion-preset-blur-right">I'm <span className="text-red">Sean Wayne Gabule</span></motion.div>
        </div>
      </div>
      <div className="h-screen snap-center flex gap-3 flex-col items-center justify-center">
        <motion.div
          initial={{ opacity: 0, filter: "blur(5px)", y: -100 }}
          whileInView={{ opacity: 1, filter: "blur(0px)", y: 0,
            transition: { 
              default: { duration: 1, ease: "circOut" },
              filter: { duration: .5 },
              opacity: { duration: .5 }
            }
          }}>Are you an employer? <span className="text-red">Great!</span></motion.div>
        <motion.div
          initial={{ opacity: 0, filter: "blur(5px)" }}
          whileInView={{ opacity: 1, filter: "blur(0px)" }}
          transition={{ delay: .75 }}
        >Which would you like to know about me?</motion.div>
        <motion.div
            initial={{ opacity: 0, transform: "translate3d(0, -100px, 0) rotateX(60deg)" }}
            whileInView={{ opacity: 1, transform: "translate3d(0, 0px, 0) rotateX(0deg)" }}
            transition={{ duration: 1, delay: 1, ease: "easeOut" }}
        className="flex gap-20 perspective max-md:hidden">
          <Card3D href="/portfolio" text="Programming">
            <img src="images/programming.jpg" className="w-full h-full object-cover rounded-2xl" />
          </Card3D>
          <Card3D href="/portfolio" text="Motion Graphics">
            <img src="images/Logo.gif" className="w-full h-full object-cover rounded-2xl" />
          </Card3D>
        </motion.div>
        <div className="md:hidden flex flex-col gap-4 w-full items-center">
          <Card href="/portfolio" text="Programming">
            <img src="images/programming.jpg" className="w-full h-full object-cover rounded-2xl" />
          </Card>
          <Card href="/portfolio" text="Motion Graphics">
            <img src="images/Logo.gif" className="w-full h-full object-cover rounded-2xl" />
          </Card>
        </div>
      </div>
    </div>
  );
}
