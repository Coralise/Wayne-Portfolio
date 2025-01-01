import Link from "next/link";
import { motion } from "motion/react";

export default function Card3D({ href, children, text }) {
    
    return (
        <motion.a href={href} className="group flex flex-col gap-3 relative z-10 w-40 h-64 bg-transparent"
            whileHover={{ transform: "translate3d(0, 0px, 0) rotateX(0deg)" }}
            transition={{ duration: .5, ease: "backInOut" }}
            style={{ transform: "translate3d(0, 100px, 0) rotateX(80deg)" }}
        >
            <div className="w-full h-full rounded-2xl">
                {children}
            </div>
            <div className="text-center group-hover:opacity-100 group-hover:translate-y-0 opacity-0 -z-10 -translate-y-10 transition-all duration-500 ease-out select-none font-bold">{text}</div>
        </motion.a>
    );

}