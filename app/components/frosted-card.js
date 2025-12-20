"use client";

import React from 'react';
import * as motion from "motion/react-client"
import { hover } from 'motion';

export const cardVariants = {
    hidden: { opacity: 0, y: 300, filter: "blur(5px)" },
    visible: {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        transition: {
            ease: [.1, .8, .4, 1],
            duration: .75
        }
    }
};

function FrostedCard({ children, className }) {
    return (
        <motion.article
            className={`
                ${className}
                p-4 rounded-2xl border-[1px] border-white border-opacity-5
                bg-white bg-opacity-[3%] backdrop-blur-sm
                shadow-[0px_0px_0px_var(--highlighter)]
                hover:shadow-[0px_0px_15px_var(--highlighter)]
                transition-shadow duration-500
            `}
            variants={cardVariants}
            whileHover={{
                scale: 1.02
            }}
            transition={{
                ease: [.1, .8, .4, 1],
                duration: .75
            }}
        >
            {children}
        </motion.article>
    );
}

export default FrostedCard;