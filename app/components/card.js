"use client";

import { motion } from "motion/react";

export default function Card({ href, children, text, key }) {
    
    return (
        <motion.a href={href} className="group relative z-10 w-full h-40 bg-transparent rounded-2xl" key={key}
            whileHover={{ scale: 1.1 }}
            transition={{ duration: .5, ease: "backOut" }}
        >
            <div className="absolute bg-black opacity-0 group-hover:opacity-40 w-full h-full transition-all rounded-2xl" />
            {children}
            <div className="text-center select-none absolute top-3/4 w-full text-shadow-lg group-hover:opacity-100 opacity-0 transition-all">{text}</div>
        </motion.a>
    );

}