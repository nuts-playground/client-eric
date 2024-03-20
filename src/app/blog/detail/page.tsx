'use client'
import Header from "@/components/header";
import userPepe from '../../../../public/user-normal-profile.png';

import React, {useEffect, useState} from "react";
import process from "process";
import useUserInfo from "@/hooks/useUserInfo";
import Loading from "@/components/loading";
import Footer from "@/components/footer";
import {useSearchParams} from "next/navigation";
import {formatDate} from "@/components/function/date";
import Image from "next/image";
import Link from "next/link";

export default function BlogDetail() {
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
            provider_id: '',
            user_email: ''
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
                    <section className={`p-12 h-full box-border flex justify-center`}>
                        <div className={`max-w-6xl w-full`}>
                            <div className={`max-w-2xl m-auto`}>
                                <div className={`titleBox flex items-center flex-col mb-4`}>
                                    <h1 className={`text-2xl font-bold mb-1`}>{contentInfo.title}</h1>
                                    <p className={`text-sm`}>{contentInfo.update_dtm ? formatDate(contentInfo.update_dtm) : formatDate(contentInfo.create_dtm)}</p>
                                </div>
                                {
                                    userInfo.email !== contentInfo.user_id.user_email ? null :
                                        <div className={`mb-4 flex justify-end`}>
                                            <Link href={{
                                                pathname: '/blog/update',
                                                query: {id: idParam},
                                            }} className={`btn btn-sm`}>수정하기</Link>
                                        </div>
                                }

                                <div className="border-05 mb-10"></div>
                                <div>
                                    <div className={`mb-5`}>
                                        {contentInfo.content}
                                    </div>
                                    <div>
                                    <div className="border-05 mt-10"></div>
                                        <div className={`flex items-center my-4`}>
                                            <Image src={userPepe} alt={'임시용 프로필 사진'} width={50}/>
                                            <div className={`ml-4`}>
                                                <p className={`text-xs`}>{contentInfo.user_id.provider_id.toUpperCase()}</p>
                                                <p>
                                                    <span className={`font-bold`}>{contentInfo.user_id.user_name}</span>
                                                    <span className={`ml-1`}>님 작성</span>
                                                </p>
                                            </div>
                                        </div>
                                        <textarea
                                            className="textarea textarea-bordered  bg-white w-full resize-none h-32 mb-2"
                                            placeholder="댓글을 입력해 주세요."
                                        ></textarea>
                                        <div className={`flex flex-end w-full justify-end`}>
                                            {
                                                userInfo.email ? <button className={`btn btn-sm`}>등록하기</button> : null
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
            }
            <Footer/>
        </main>
    )
}
