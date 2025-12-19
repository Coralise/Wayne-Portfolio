"use client";

import { FaDiscord, FaFacebookF, FaGithubAlt, FaLinkedinIn, FaPhoneAlt } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { IoMdMail } from "react-icons/io";

export default function Contact() {

    return (
        <div className="h-screen w-full items-center justify-center flex gap-8 max-md:flex-col">
            <div className="md:w-1/3 max-md:px-4 flex flex-col">
                <span className="text-5xl font-bold">Let's Chat<span className="text-highlight font-black">.</span></span>
                
                <span className="mt-8 flex gap-1 items-center text-foreground-2nd"><span className="text-foreground"><IoMdMail /></span> shaseajojo@gmail.com</span>
                <span className="flex gap-1 items-center text-foreground-2nd"><span className="text-foreground"><FaPhoneAlt /></span> (+63) 927 973 4717</span>
                <span className="flex gap-1 items-center text-foreground-2nd"><span className="text-foreground"><FaLocationDot /></span> Matina, Davao City, Davao del Sur, Philippines</span>

                <div className="mt-8 flex gap-2">
                    <a href="https://discord.com/users/254225248889602048" target="_blank" className="flex w-fit p-2 bg-neutral-400 rounded-lg transition-all duration-500 hover:bg-transparent text-background hover:text-[#7289da] shadow-[transparent_0px_0px_5px_4px] hover:shadow-[#7289da_0px_0px_5px_4px]">
                        <FaDiscord className="size-4" />
                    </a>
                    <a href="https://github.com/Coralise" target="_blank" className="flex w-fit p-2 bg-neutral-400 rounded-lg transition-all duration-500 hover:bg-transparent text-background hover:text-[#6e5494] shadow-[transparent_0px_0px_5px_4px] hover:shadow-[#6e5494_0px_0px_5px_4px]">
                        <FaGithubAlt className="size-4" />
                    </a>
                    {/* <a href="https://www.linkedin.com/in/sean-wayne-gabule-083a481a6/" target="_blank" className="flex w-fit p-2 bg-neutral-400 rounded-lg transition-all duration-500 hover:bg-transparent text-background hover:text-[#0077B5] shadow-[transparent_0px_0px_5px_4px] hover:shadow-[#0077B5_0px_0px_5px_4px]">
                        <FaLinkedinIn className="size-4" />
                    </a>
                    <a href="https://www.facebook.com/Waynezki" target="_blank" className="flex w-fit p-2 bg-neutral-400 rounded-lg transition-all duration-500 hover:bg-transparent text-background hover:text-[#1877F2] shadow-[transparent_0px_0px_5px_4px] hover:shadow-[#1877F2_0px_0px_5px_4px]">
                        <FaFacebookF className="size-4" />
                    </a> */}
                </div>
            </div>
            <div className="md:w-1/3 max-md:w-full max-md:px-4">
                <div className="w-full p-4 rounded-lg bg-background shadow-[3px_3px_0px_0px_var(--highlight)] border-2 border-highlight">
                        <form className="flex flex-col gap-4"
                            action="https://formspree.io/f/xyzjkvbe"
                            method="POST"
                        >
                            <input className="w-full py-2 px-4 input" placeholder="Email" name="email" />
                            <textarea className="input" rows={7} placeholder="Body" name="body" />
                            <button className="self-end py-2 px-4 bg-highlighter rounded-md font-bold border-4 border-transparent hover:border-highlighter hover:bg-transparent transition-all duration-300" type="submit">Send Email</button>
                        </form>
                </div>
            </div>
        </div>
    );
}