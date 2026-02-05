import { FaFlutter, FaGitAlt } from "react-icons/fa6";
import { IoMdDocument } from "react-icons/io";
import { RiFirebaseFill, RiJavaLine } from "react-icons/ri";
import { SiAdobeaftereffects, SiAdobeillustrator, SiAdobepremierepro, SiDart, SiDocker, SiKubernetes, SiMysql, SiNextdotjs, SiSpigotmc, SiSpringboot, SiSqlite } from "react-icons/si";
import { TbBrandMysql } from "react-icons/tb";
import { FaReact } from "react-icons/fa";

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
    "aftereffects": <SiAdobeaftereffects />,
    "illustrator": <SiAdobeillustrator />,
    "premierepro": <SiAdobepremierepro />,
    "springboot": <SiSpringboot />,
    "git": <FaGitAlt />,
    "docker": <SiDocker />,
    "kubernetes": <SiKubernetes />,
}

export default function Tag({ text, icon, color }) {
    // If color is provided, use it for custom styling
    if (color) {
        return (
            <div 
                className="py-0.5 px-2 rounded-lg w-fit h-fit text-xs select-none flex items-center gap-1 font-barlow-condensed"
                style={{ 
                    backgroundColor: `${color}33`, // 20% opacity
                    color: color 
                }}
            >
                {icon != undefined && icons[icon]}
                <div>{text}</div>
            </div>
        );
    }
    
    // Default styling
    return (
        <div className="py-0.5 px-2 rounded-lg bg-highlighter-2nd text-background font-semibold w-fit h-fit text-xs select-none flex items-center gap-1 font-barlow-condensed">
            {icon != undefined && icons[icon]}
            <div>{text}</div>
        </div>
    );
}