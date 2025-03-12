import { FaFlutter } from "react-icons/fa6";
import { IoMdDocument } from "react-icons/io";
import { RiFirebaseFill, RiJavaLine } from "react-icons/ri";
import { SiDart, SiMysql, SiSpigotmc, SiSqlite } from "react-icons/si";
import { TbBrandMysql } from "react-icons/tb";

const tags = {
    "java": <RiJavaLine />,
    "mysql": <TbBrandMysql />,
    "mcspigotapi": <SiSpigotmc />,
    "flutter": <FaFlutter />,
    "dart": <SiDart />,
    "googlefirebase": <RiFirebaseFill />,
    "sqlite": <SiSqlite />,
    "ocr": <IoMdDocument />
}

export default function Tag({ text, icon }) {
    return (
        <div className="py-0.5 px-2 rounded-lg bg-highlighter w-fit h-fit text-xs select-none flex items-center gap-1 font-barlow-condensed text-foreground">
            {icon != undefined ? tags[icon] : <RiJavaLine />}
            <div>{text}</div>
        </div>
    );
}