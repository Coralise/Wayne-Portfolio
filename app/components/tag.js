import { FaFlutter, FaGamepad, FaGitAlt } from "react-icons/fa6";
import { IoMdDocument } from "react-icons/io";
import { RiFirebaseFill, RiJavaLine } from "react-icons/ri";
import { SiDart, SiDocker, SiFramer, SiKubernetes, SiLua, SiNextdotjs, SiSocketdotio, SiSpigotmc, SiSpringboot, SiSqlite, SiSupabase, SiTailwindcss, SiTypescript, SiWebrtc } from "react-icons/si";
import { TbBrandMysql } from "react-icons/tb";
import { FaReact, FaVideo, FaPaintBrush, FaImage } from "react-icons/fa";

const icons = {
    "java": <RiJavaLine />,
    "mysql": <TbBrandMysql />,
    "mcspigotapi": <SiSpigotmc />,
    "flutter": <FaFlutter />,
    "dart": <SiDart />,
    "googlefirebase": <RiFirebaseFill />,
    "firebase": <RiFirebaseFill />,
    "sqlite": <SiSqlite />,
    "ocr": <IoMdDocument />,
    "nextjs": <SiNextdotjs />,
    "react": <FaReact />,
    "aftereffects": <FaVideo />,
    "illustrator": <FaPaintBrush />,
    "premierepro": <FaVideo />,
    "springboot": <SiSpringboot />,
    "git": <FaGitAlt />,
    "docker": <SiDocker />,
    "kubernetes": <SiKubernetes />,
    "typescript": <SiTypescript />,
    "tailwindcss": <SiTailwindcss />,
    "framer-motion": <SiFramer />,
    "supabase": <SiSupabase />,
    "webrtc": <SiWebrtc />,
    "lua": <SiLua />,
    "socket.io": <SiSocketdotio />,
    "gamedesign": <FaGamepad />,
}

export default function Tag({ text, icon, color = "#ff3b3f" }) {
    // Accent colour only tints the chip and its icon; the label stays neutral so it reads on the tint.
    return (
        <div
            className="py-0.5 px-2 rounded-lg w-fit h-fit text-xs text-foreground select-none flex items-center gap-1 font-barlow-condensed border"
            style={{
                backgroundColor: `${color}1f`,
                borderColor: `${color}59`,
            }}
        >
            {icon != undefined && <span style={{ color }}>{icons[icon]}</span>}
            <div>{text}</div>
        </div>
    );
}
