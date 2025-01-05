"use client";

import { FaDiscord, FaFacebookF, FaGithubAlt, FaLinkedinIn, FaPhoneAlt } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { IoMdMail } from "react-icons/io";
import styled from 'styled-components';

export default function Contact() {

    const contact = (formData) => {

    }

    return (
        <div className="h-screen w-screen items-center justify-center flex gap-8">
            <div className="w-1/3 flex flex-col">
                <span className="text-5xl font-bold">Let's Chat<span className="text-highlight font-black">.</span></span>
                
                <span className="mt-8 flex gap-1 items-center text-foreground-2nd"><span className="text-foreground"><IoMdMail /></span> wayne@gabule.com</span>
                <span className="flex gap-1 items-center text-foreground-2nd"><span className="text-foreground"><FaPhoneAlt /></span> (+63) 927 973 4717</span>
                <span className="flex gap-1 items-center text-foreground-2nd"><span className="text-foreground"><FaLocationDot /></span> Matina, Davao City, Davao del Sur, Philippines</span>

                <div className="mt-8 flex gap-2">
                    <a href="https://discord.com/users/254225248889602048" target="_blank" className="flex w-fit p-2 bg-neutral-400 rounded-lg transition-all duration-500 hover:bg-transparent text-background hover:text-[#7289da] shadow-[transparent_0px_0px_5px_4px] hover:shadow-[#7289da_0px_0px_5px_4px]">
                        <FaDiscord className="size-4" />
                    </a>
                    <a href="https://github.com/Coralise" target="_blank" className="flex w-fit p-2 bg-neutral-400 rounded-lg transition-all duration-500 hover:bg-transparent text-background hover:text-[#6e5494] shadow-[transparent_0px_0px_5px_4px] hover:shadow-[#6e5494_0px_0px_5px_4px]">
                        <FaGithubAlt className="size-4" />
                    </a>
                    <a href="https://www.linkedin.com/in/sean-wayne-gabule-083a481a6/" target="_blank" className="flex w-fit p-2 bg-neutral-400 rounded-lg transition-all duration-500 hover:bg-transparent text-background hover:text-[#0077B5] shadow-[transparent_0px_0px_5px_4px] hover:shadow-[#0077B5_0px_0px_5px_4px]">
                        <FaLinkedinIn className="size-4" />
                    </a>
                    <a href="https://www.facebook.com/Waynezki" target="_blank" className="flex w-fit p-2 bg-neutral-400 rounded-lg transition-all duration-500 hover:bg-transparent text-background hover:text-[#1877F2] shadow-[transparent_0px_0px_5px_4px] hover:shadow-[#1877F2_0px_0px_5px_4px]">
                        <FaFacebookF className="size-4" />
                    </a>
                </div>
            </div>
            <div className="w-1/3">
                <div className="w-full p-8 rounded-lg bg-background shadow-[3px_3px_0px_0px_var(--highlighter)] border-2 border-highlighter">

                </div>
            </div>
        </div>
    );
}