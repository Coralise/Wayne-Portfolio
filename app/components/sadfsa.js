import Link from "next/link";

export default function Header() {
    return (
        <div className="p-5 bg-zinc-900 rounded-2xl mt-5 text-zinc-100 flex gap-5 my-auto fixed container bg-opacity-30 backdrop-blur-md z-50">
            <Link href={'/'}><img src="images/logo.png" className="size-5 hover:size-7 m-1 hover:m-0 transition-all duration-300 ease-out hover:-rotate-6 active:size-5 active:m-1" /></Link>
            <Link href={'/resume'} className="hover:text-red transition-all ease-out duration-300 my-auto hover:-rotate-6 active:rotate-6">Résumé</Link>
            <Link href={'/portfolio'} className="hover:text-red transition-all ease-out duration-300 my-auto hover:-rotate-6 active:rotate-6">Portfolio</Link>
            <Link href={'/fun'} className="hover:text-red transition-all ease-out duration-300 my-auto hover:-rotate-6 active:rotate-6">Fun</Link>
            <Link href={'/weather'} className="hover:text-red transition-all ease-out duration-300 my-auto hover:-rotate-6 active:rotate-6">Weather</Link>
        </div>
    );
}