'use client'
import Header from "@/components/header";
import Editor from "@/components/board/editor";
import React, {useEffect, useState} from "react";
import process from "process";
import {SuccessAlert} from "@/components/alert";
import useUserInfo from "@/hooks/useUserInfo";
import {useSearchParams} from "next/navigation";
import Loading from "@/components/loading";

export default function BlogNewContent() {
    const [actionState, setActionState] = useState(false);
    const {userInfo} = useUserInfo()
    const [contentInfo, setContentInfo] = useState({
        content: "",
        content_id: null,
        create_dtm: "",
        delete_dtm: null,
        title: "",
        update_dtm: null,
        user_id: {
            user_name: '',
            provider_id: ''
        }
    })
    const params = useSearchParams();
    const idParam = params.get('id');

    const getContentInfo = async() => {
        const getContentUrl = process.env.NEXT_PUBLIC_API_URL + '/board' + '/content' +  '/' + idParam
        const res = await fetch(getContentUrl, {
            method: 'GET',
            credentials: "include"
        }).then(res => res.json())

        setContentInfo(res.data)
    }
    useEffect(() => {
        (async()=>{
            await getContentInfo();
            setActionState(true)
        })()
    }, []);
    return (
        <main className={`h-full flex flex-col`}>
            <Header/>
            {
                !actionState ? <Loading/> :
                    <section className={`p-12 h-full box-border`}>
                        <Editor

                            updateTitle={contentInfo.title}
                            updateContent={contentInfo.content}/>
                    </section>
            }
        </main>
    )
}
