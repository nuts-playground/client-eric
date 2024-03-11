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
            <div className={`mb-5`}>
                <p className={`text-sm mb-2`}>{writeTime.slice(0,10)}</p>
                <p className={`font-bold text-xl`}>{title}</p>
            </div>
            <Link href={'/blog'}>
                <p className={``}>{
                    content.length > 100 ? content.slice(0, 100) + ' ...' : content
                }</p>
            </Link>
            <div className="divider"></div>
        </div>
    )
}
export default Content;
