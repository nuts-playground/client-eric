'use client'
import Header from "@/components/header";
import Footer from "@/components/footer";
import React, {useEffect, useState} from "react";
import Loading from "@/components/loading";
import Link from "next/link";
import * as process from "process";
import Content from "@/components/board/content";

interface CategoryType {
    category_id: number;
    title: string;
}
export default function BlogMain() {

    const [boardCategory, setBoardCategory] = useState<string[]>();
    const [actionState, setActionState] = useState(false);

    useEffect(() => {
        (async()=>{
            const categoryList = await boardPageNavItem()
            setBoardCategory(categoryList)
            setActionState(true)
        })()
    },[])

    const getContentItem = async() => {
        const getContentUrl = process.env.NEXT_PUBLIC_API_URL + '/board' + '/getBoardLatestContentList'
        const res = await fetch(getContentUrl, {
            method: 'GET',
            credentials: "include"
        })
        const resJson = await res.json();
        console.log(resJson)
    }

    const boardPageNavItem = async(): Promise<string[]> => {
        const getBoardCategoryUrl = process.env.NEXT_PUBLIC_API_URL + '/board' + '/getBoardCategoryAll';
        const res = await fetch(getBoardCategoryUrl,{
            method: 'GET',
            credentials: "include"
        })
        const resJson = await res.json();
        const categoryList = await resJson.data as CategoryType[];
        return categoryList.map((item: CategoryType) => item.title)
    }

    const testBoard = [
        {title: 'test1', writeTime: '2024.02.24', content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. At cum distinctio dolore dolorum exercitationem odio omnis rerum soluta, sunt velit? Cupiditate doloremque esse fuga id itaque omnis perferendis ratione vel?'},
        {title: 'test2', writeTime: '2024.02.24', content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. At cum distinctio dolore dolorum exercitationem odio omnis rerum soluta, sunt velit? Cupiditate doloremque esse fuga id itaque omnis perferendis ratione vel?'},
        {title: 'test3', writeTime: '2024.02.24', content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. At cum distinctio dolore dolorum exercitationem odio omnis rerum soluta, sunt velit? Cupiditate doloremque esse fuga id itaque omnis perferendis ratione vel?'},
        {title: 'test4', writeTime: '2024.02.24', content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. At cum distinctio dolore dolorum exercitationem odio omnis rerum soluta, sunt velit? Cupiditate doloremque esse fuga id itaque omnis perferendis ratione vel?'},
        {title: 'test5', writeTime: '2024.02.24', content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. At cum distinctio dolore dolorum exercitationem odio omnis rerum soluta, sunt velit? Cupiditate doloremque esse fuga id itaque omnis perferendis ratione vel?'},
    ]

    return (
        <main className={`h-full flex flex-col justify-between`}>

            <Header boardPageNav={boardCategory}/>
            {
                !actionState ? <Loading/> :
                    <section className={`p-12 flex flex-col justify-between `}>
                        <div className={`flex justify-between mb-10`}>
                            <div className={`font-bold text-xl`}>최근 글</div>

                            <Link href={'/blog/newcontent'} className={`btn btn-ghost underline`}>글쓰기</Link>
                        </div>
                        <div className={`h-full mb-4`}>
                            <ul>
                                {
                                    testBoard.map(item => {
                                        return <li key={item.title}>
                                            <Content
                                                title={item.title}
                                                writeTime={item.writeTime}
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
