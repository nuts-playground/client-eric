'use client'
import Header from "@/components/header";
import userPepe from '../../../../public/user-normal-profile.png';

import React, {BaseSyntheticEvent, useEffect, useState} from "react";
import process from "process";
import useUserInfo from "@/hooks/useUserInfo";
import Loading from "@/components/loading";
import Footer from "@/components/footer";
import {useSearchParams} from "next/navigation";
import {formatDate} from "@/components/function/date";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";

interface Comment {
    comment: string,
    comment_id: string,
    create_dtm: string,
    delete_dtm: string,
    update_dtm: string,
}
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
    const [commentState, setCommentState] = useState('');
    const [commentInfo, setCommentInfo] = useState<Comment[]>([{
        comment: "",
        comment_id: "",
        create_dtm: "",
        delete_dtm: "",
        update_dtm: "",
    }]);
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

    const onChangeComment = (e: BaseSyntheticEvent) => {
        setCommentState(String(e.target.value));
    }

    const submitBoardComment = async(e: BaseSyntheticEvent) => {
        setActionState(false)
        if(!userInfo) {
            console.log('에러!')
            alert('에러!')
            setActionState(true)
            return false;
        }

        const commentValue = {
            user_email: userInfo.email,
            content_id: contentInfo.content_id,
            comment: commentState
        }

        const createCommentUrl = process.env.NEXT_PUBLIC_API_URL + '/board' + '/comment';
        await axios.post(createCommentUrl, commentValue, {
            withCredentials: true
        }).then(res => {
            const successSw = res.data.status === 'success';
            if(successSw) {
                location.reload();
            } else {
                console.log('실패')
                setActionState(true)
            }
        }).catch(err => {
            console.log(err)
            setActionState(true)
        })

    }
    const getCommentList = async() => {
        const commentListUrl = process.env.NEXT_PUBLIC_API_URL + '/board' + '/commentList' + '/' + idParam;
        const commentList = await axios.get(commentListUrl).then(res => {
            return res.data.data;
        });
        setCommentInfo(commentList);
    }
    useEffect(() => {
        (async()=>{
            await getContentInfo();
            setActionState(true)
            await getCommentList();
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
                                <div className={`pb-4`}>
                                    <div className={`titleBox flex items-center flex-col mb-4`}>
                                        <h1 className={`text-2xl font-bold mb-1`}>{contentInfo.title}</h1>
                                        <p className={`text-sm`}>{contentInfo.update_dtm ? formatDate(contentInfo.update_dtm) : formatDate(contentInfo.create_dtm)}</p>
                                    </div>
                                    {
                                        userInfo.email !== contentInfo.user_id.user_email ? null :
                                            <div className={`flex justify-end`}>
                                                <Link href={{
                                                    pathname: '/blog/update',
                                                    query: {id: idParam},
                                                }} className={`btn btn-sm`}>수정하기</Link>
                                            </div>
                                    }
                                </div>
                                <div className={`contents-area`}>
                                    <textarea
                                        className={`w-full h-full resize-none px-2 py-6 border-y-05`}
                                        defaultValue={contentInfo ? contentInfo.content : undefined}
                                    />
                                    <div className={`mb-10`}>
                                        <div className={`flex items-center py-3`}>
                                            <Image src={userPepe} alt={'임시용 프로필 사진'} width={50}/>
                                            <div className={`ml-4`}>
                                                <p className={`text-xs`}>{contentInfo.user_id.provider_id.toUpperCase()}</p>
                                                <p>
                                                    <span className={`font-bold`}>{contentInfo.user_id.user_name}</span>
                                                    <span className={`ml-1`}>님 작성</span>
                                                </p>
                                            </div>
                                        </div>
                                        <div className={`mt-1`}>
                                            <textarea
                                                className="textarea textarea-bordered  bg-white w-full resize-none h-32 mb-2"
                                                placeholder="댓글을 입력해 주세요."
                                                // defaultValue={""}
                                                onChange={onChangeComment}
                                            ></textarea>
                                            <div className={`flex flex-end w-full justify-end`}>
                                                {
                                                    userInfo.email ? <button className={`btn btn-sm`} onClick={submitBoardComment}>등록하기</button> : null
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <ul className={`comment-area flex flex-col gap-5`}>
                                    {
                                        commentInfo.map((item) => {
                                            return <li key={item.comment_id} className={`w-full`}>
                                                <div className={`flex items-center`}>
                                                    <div className={`mr-2`}>
                                                        <Image src={userPepe} alt={'임시용 프로필 사진'} width={40} height={40}/>
                                                    </div>
                                                    <div className={`text-sm`}>
                                                        <p>{formatDate(item.create_dtm)}</p>
                                                        <p>{item.comment}</p>
                                                    </div>
                                                </div>
                                            </li>
                                        })
                                    }
                                </ul>
                            </div>
                        </div>
                    </section>
            }
            <Footer/>
        </main>
    )
}
