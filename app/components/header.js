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
        <header>
            <div className="p-5 rounded-2xl hidden sm:flex gap-5 my-auto fixed container z-50">
                <Link href={'/'}><img src="images/logo2.png" className="size-5 hover:size-7 m-1 hover:m-0 transition-all duration-300 ease-out hover:rotate-45 active:size-5 active:m-1" /></Link>
                <Link href={'/resume'} className="hover:text-highlight transition-all ease-out duration-300 my-auto hover:-rotate-6 active:rotate-6 hover:font-semibold">Resume</Link>
                <Link href={'/#portfolio-section'} className="hover:text-highlight transition-all ease-out duration-300 my-auto hover:-rotate-6 active:rotate-6 hover:font-semibold">Portfolio</Link>
                <Link href={'/contact'} className="hover:text-highlight transition-all ease-out duration-300 my-auto hover:-rotate-6 active:rotate-6 hover:font-semibold">Contact</Link>
            </div>
            <div className={`flex w-screen z-40 justify-end absolute`}>
                <button onClick={toggleNavBar} className={`${!navBarOpened ? "opacity-0 pointer-events-none" : "max-sm:opacity-30 sm:opacity-0 sm:pointer-events-none"} transition-opacity duration-500 fixed w-screen h-screen bg-black -z-50`} />
                <div className={`${!navBarOpened ? "w-0 overflow-hidden" : "max-sm:w-3/4 sm:w-0 sm:overflow-hidden"} transition-all duration-500 fixed max-w-screen h-screen bg-background pt-14 rounded-l-3xl`}>
                    <div className="mx-4 flex flex-col gap-2 font-bold ">
                        <Link href={'/'} onClick={toggleNavBar}>Home</Link>
                        <Link href={'/resume'} onClick={toggleNavBar}>Resume</Link>
                        <Link href={'/#portfolio-section'} onClick={toggleNavBar}>Portfolio</Link>
                        <Link href={'/contact'} onClick={toggleNavBar}>Contact</Link>
                    </div>
                </div>
            </div>
            <div className="hidden max-sm:flex fixed z-50 w-full justify-end p-2">
                <button onClick={toggleNavBar} className={`bg-highlighter shadow-md rounded-full transition-all duration-300 p-1`}>
                    <img src="images/logo2.png" className={`transition-all duration-300 ease-out size-5 m-1 ${navBarOpened ? "rotate-45" : ""}`} />
                </button>
            </div>
        </header>
    );
}