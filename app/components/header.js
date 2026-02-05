"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { FaAddressCard } from "react-icons/fa";

export default function Header() {

    const [ navBarOpened, setNavBarOpened ] = useState(false);

    const toggleNavBar = () => {
        setNavBarOpened(!navBarOpened);
    }

    return (
        <header className="">
            <div className="p-4 hidden sm:flex gap-4 my-auto fixed z-50 w-full backdrop-blur-sm bg-white/5 border-b-[1px] border-white/10">
                <Link href={'/'}><img alt="Logo" src="images/logo.png" className="size-5 hover:size-7 m-1 hover:m-0 transition-all duration-300 ease-out rotate-[-45deg] hover:rotate-[0deg] active:size-5 active:m-1" /></Link>
                <Link href={'/'} className="hover:text-highlight transition-all ease-out duration-300 my-auto hover:-rotate-6 active:rotate-6 hover:font-semibold">Overview</Link>
                <span>•</span>
                <Link href={'/resume'} className="hover:text-highlight transition-all ease-out duration-300 my-auto hover:-rotate-6 active:rotate-6 hover:font-semibold">About</Link>
                <span>•</span>
                <Link href={'/programming-portfolio'} className="hover:text-highlight transition-all ease-out duration-300 my-auto hover:-rotate-6 active:rotate-6 hover:font-semibold">Programming</Link>
                <span>•</span>
                <Link href={'/motion-graphics-portfolio'} className="hover:text-highlight transition-all ease-out duration-300 my-auto hover:-rotate-6 active:rotate-6 hover:font-semibold">Motion Graphics</Link>
                <span>•</span>
                <Link href={'/contact'} className="hover:text-highlight transition-all ease-out duration-300 my-auto hover:-rotate-6 active:rotate-6 hover:font-semibold">Contact Me</Link>
            </div>
            <div className={`flex w-screen z-40 justify-end absolute`}>
                <button onClick={toggleNavBar} className={`${navBarOpened ? "max-sm:opacity-30 sm:opacity-0 sm:pointer-events-none" : "opacity-0 pointer-events-none"} transition-opacity duration-500 fixed w-screen h-screen bg-black -z-50`} />
                <div className={`${navBarOpened ? "max-sm:w-3/4 sm:w-0 sm:overflow-hidden" : "w-0 overflow-hidden"} transition-all duration-500 fixed max-w-screen h-screen bg-background pt-14 rounded-l-3xl`}>
                    <div className="mx-4 flex flex-col gap-2 font-bold ">
                        <Link href={'/'} onClick={toggleNavBar}>Overview</Link>
                        <Link href={'/resume'} onClick={toggleNavBar}>About</Link>
                        <Link href={'/programming-portfolio'} onClick={toggleNavBar}>Programming</Link>
                        <Link href={'/motion-graphics-portfolio'} onClick={toggleNavBar}>Motion Graphics</Link>
                        <Link href={'/contact'} onClick={toggleNavBar}>Contact Me</Link>
                    </div>
                </div>
            </div>
            <div className="hidden max-sm:flex fixed z-50 w-full justify-end bottom-0 p-4">
                <button onClick={toggleNavBar} className={`bg-highlighter shadow-md rounded-full transition-all duration-300 p-1`}>
                    <img src="images/logo.png" className={`transition-all duration-300 ease-out size-8 m-1 ${navBarOpened ? "rotate-[0deg]" : "rotate-[-45deg]"}`} />
                </button>
            </div>
        </header>
    );
}