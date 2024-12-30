import Link from "next/link";
import { motion } from "motion/react";

export default function Card({ href, children, text }) {
    
    return (
        <motion.a href={href} className="group relative z-10 w-full h-40 bg-transparent rounded-2xl"
            // whileHover={{ scale: 1.1 }}
            transition={{ duration: .5, ease: "backOut" }}
        >
            {children}
            <div className="text-center select-none absolute top-3/4 w-full text-shadow-lg">{text}</div>
        </motion.a>
    );

}