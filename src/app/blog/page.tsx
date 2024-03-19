'use client'
import Header from "@/components/header";
import Footer from "@/components/footer";
import React, {useEffect, useState} from "react";
import Loading from "@/components/loading";
import Link from "next/link";
import * as process from "process";
import Content from "@/components/board/content";
import useUserInfo from "@/hooks/useUserInfo";

interface CategoryType {
    category_id: number;
    title: string;
}

interface BoardContent {
    content_id: number;
    title: string;
    content: string;
    create_dtm: string;
    update_dtm: string;
    delete_dtm: string;
}
export default function BlogMain() {
    const {userInfo} = useUserInfo()
    const [boardCategory, setBoardCategory] = useState<string[]>();
    const [actionState, setActionState] = useState(false);
    const [boardContent, setBoardContent] = useState<BoardContent[] | undefined>(undefined)
    useEffect(() => {
        (async()=>{
            const categoryList = await boardPageNavItem()
            const contentList = await getContentItem();
            setBoardContent(contentList)

            setBoardCategory(categoryList)
            setActionState(true)
        })()
    },[])

    const getContentItem = async(): Promise<BoardContent[] | undefined>=> {
        const getContentUrl = process.env.NEXT_PUBLIC_API_URL + '/board' + '/latestContentList'
        const res = await fetch(getContentUrl, {
            method: 'GET',
            credentials: "include"
        })
        const resJson = await res.json();
        return resJson.data;
    }

    const boardPageNavItem = async(): Promise<string[] | undefined> => {
        if (location.hostname === 'localhost') return;

        const getBoardCategoryUrl = process.env.NEXT_PUBLIC_API_URL + '/board' + '/categoryList';
        const res = await fetch(getBoardCategoryUrl,{
            method: 'GET',
            credentials: "include"
        })
        const resJson = await res.json();
        const categoryList = await resJson.data as CategoryType[];
        return categoryList.map((item: CategoryType) => item.title)
    }

    const loginCheck = () => {
        const globalThis = window as any;

        return globalThis.testUser === true;
    }
    return (
        <main className={`h-full flex flex-col justify-between`}>

            <Header boardPageNav={boardCategory}/>
            {
                !actionState ? <Loading/> :
                    <section className={`p-12 flex flex-col justify-between items-center`}>
                        <div className={`flex justify-between mb-10 items-center max-w-6xl w-full`}>
                            <div className={`font-bold text-xl`}>최근 글</div>

                            { userInfo.email ? <Link href={'/blog/newcontent'} className={`btn btn-ghost underline`}>글쓰기</Link> : null }
                        </div>
                        <div className={`h-full mb-4 max-w-6xl w-full`}>
                            <ul>
                                {
                                    boardContent?.map(item => {
                                        return <li key={item.title}>
                                            <Content
                                                title={item.title}
                                                writeTime={item.create_dtm}
                                                content={item.content}
                                            />
                                        </li>
                                    })
                                }
                            </ul>
                        </div>
                        <div className={`w-full flex justify-center`}>
                            <div className="join">
                                <button className="btn bg-base-100 border-none">1</button>
                                {/*<button className="join-item btn btn-active">1</button>*/}
                                {/*<button className="join-item btn bg-gray-100">2</button>*/}
                                {/*<button className="join-item btn bg-gray-100">3</button>*/}
                                {/*<button className="join-item btn bg-gray-100">4</button>*/}
                            </div>
                        </div>
                    </section>
            }
            <Footer/>
        </main>
    )
}
