import { RiJavaLine } from "react-icons/ri";

export default function Tag({ text, icon }) {
    return (
        <div className="py-0.5 px-2 rounded-lg bg-highlighter w-fit h-fit text-xs select-none flex items-center gap-0.5 font-barlow-condensed text-foreground">
            {icon != undefined ? icon : <RiJavaLine />}
            <div>{text}</div>
        </div>
    );
}