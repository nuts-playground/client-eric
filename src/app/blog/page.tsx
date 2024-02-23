'use client'
import Header from "@/components/header";
import Editor from "@/components/board/editor";
import Footer from "@/components/footer";
import React, {useEffect, useState} from "react";
import Loading from "@/components/loading";

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
    return (
        <main className={`h-full flex flex-col justify-between`}>

            <Header boardPageNav={boardCategory}/>
            {
                !actionState ? <Loading/> :
                    <section className={`p-12 flex justify-center`}>
                        <p>블로그 메인</p>
                    </section>
            }
            <Footer/>
        </main>
    )
}
