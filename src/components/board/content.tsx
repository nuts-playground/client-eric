import React from "react";
import Link from "next/link";


interface BoardContentProps {
    title: string;
    writeTime: string;
    content: string;
}
const Content:React.FC<BoardContentProps> = ({title, writeTime, content}) => {
    return (

        <div>
            <div className={`mb-2`}>
                <p className={`font-bold text-xl`}>{title}</p>
                <p className={`text-sm`}>{writeTime}</p>
            </div>
            <Link href={'/blog'}>
                <p>{content}</p>
            </Link>
            <div className="divider"></div>
        </div>
    )
}
export default Content;