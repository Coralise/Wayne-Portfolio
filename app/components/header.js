import Link from "next/link";
import { FaAddressCard } from "react-icons/fa";

export default function Header() {
    return (
        <div className="p-5 rounded-2xl flex gap-5 my-auto fixed container z-50">
            <Link href={'/'}><img src="images/logo2.png" className="size-5 hover:size-7 m-1 hover:m-0 transition-all duration-300 ease-out hover:rotate-45 active:size-5 active:m-1" /></Link>
            <Link href={'/resume'} className="hover:text-highlight transition-all ease-out duration-300 my-auto hover:-rotate-6 active:rotate-6 hover:font-semibold">Resume</Link>
            <Link href={'/portfolio'} className="hover:text-highlight transition-all ease-out duration-300 my-auto hover:-rotate-6 active:rotate-6 hover:font-semibold">Portfolio</Link>
            <Link href={'/contact'} className="hover:text-highlight transition-all ease-out duration-300 my-auto hover:-rotate-6 active:rotate-6 hover:font-semibold">Contact</Link>
        </div>
    );
}