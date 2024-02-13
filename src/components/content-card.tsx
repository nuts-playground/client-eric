import { StaticImageData } from 'next/image'
import Image from "next/image";
import ChatIcon from '../../public/icon/chat.png';
import EyesIcon from '../../public/icon/eyes.png';
import NestJsIcon from '../../public/icon/nestjs.png';
import React from "react";
import Link from "next/link";
import log from "refractor/lang/log";
import {Scope} from "sucrase/dist/types/parser/tokenizer/state";
interface ContentCardProps {
    skillIcons?: Function[];
    title?: string;
    description?: string;
    pageLink: string;
}

const ContentCard: React.FC<ContentCardProps> =
    ({ skillIcons, title, description,pageLink }) => {

    return(
        <Link
            className={`content-card w-64 h-80 
                        flex flex-col  items-center
                        rounded-sm
                        shadow-sm
                        border
                        bg-card-content
                        px-5 py-6 transition hover:scale-103
                        duration-300 cursor-pointer
                        relative
                        box-border
            `}
            href={pageLink}
        >
            <div className={`body-area w-full h-full p-1`}>
                <div className={`title-area mb-4 pb-1 font-bold`}>
                    <p>{title}</p>
                </div>
                <div className={`description-area `}>
                    <p>{description}</p>
                </div>
            </div>

            <div className={`skill-area w-full h-14 flex items-center absolute bottom-0 left-0 border-t`}>
                <ul className={`flex px-5 gap-2 h-full w-full items-center`}>
                    {skillIcons && skillIcons.map((icon, index) => (
                        <li key={index}>
                            <div className={`skill-icon-wrap`}>
                                {icon()}
                            </div>
                            {/*<Image src={icon} width={25} alt={`Skill Icon ${index + 1}`}/>*/}
                        </li>
                    ))}
                </ul>
            </div>
        </Link>
    )
    }

export default ContentCard;
