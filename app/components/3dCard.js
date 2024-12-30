import Link from "next/link";
import { motion } from "motion/react";

export default function Card3D({ href, children, text }) {
    
    return (
        <motion.a href={href} className="group flex flex-col gap-3 relative z-10 w-60 h-96 bg-transparent"
            whileHover={{ transform: "translate3d(0, 0px, 0) rotateX(0deg)" }}
            transition={{ duration: .5, ease: "backInOut" }}
            style={{ transform: "translate3d(0, 150px, 0) rotateX(80deg)" }}
        >
            <div className="shadow-md w-full h-full rounded-2xl">
                {children}
            </div>
            <div className="text-center group-hover:opacity-100 group-hover:translate-y-0 opacity-0 -z-10 -translate-y-10 transition-all duration-500 ease-out select-none">{text}</div>
        </motion.a>
    );

}