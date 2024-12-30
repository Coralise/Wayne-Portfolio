"use client";

import { motion } from "motion/react";

export default function Template({ children }) {

    const onAnimStart = () => {
        if (document.body.offsetHeight <= window.innerHeight) {
            document.body.classList.add("overflow-hidden");
        }
    };
    const onAnimEnd = () => {
        document.body.classList.remove("overflow-hidden");
    };

    return (
        <motion.div
            initial={{ transform: "translateY(2rem)", opacity: 0 }}
            animate={{ transform: "translateY(0rem)", opacity: 1 }}
            transition={{ ease: "easeOut" }}
            onAnimationStart={onAnimStart}
            onAnimationComplete={onAnimEnd}
        >
            {children}
        </motion.div>
    )
}