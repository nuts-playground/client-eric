import React, {useEffect, useState} from "react";
import Link from "next/link";
import GOOGLE_ICON from '../../public/icon/google-icon.svg';
import GITHUB_ICON from '../../public/icon/github-icon.svg';
import NAVER_ICON from '../../public/icon/naver-icon.svg';
import KAKAO_ICON from '../../public/icon/kakao-icon.svg';
import * as process from "process";
import axios from "axios";
import * as SvgIcon from "/public/icon/index-svg";
import {FunctionGetUserInfo} from "@/components/function/getUser";

interface HeaderOption {
    boardPageNav?: string[]
}
export default function Header(headerOption: HeaderOption) {
    const [loginState, setLoginState] = useState(false);

    async function userLogOut() {
        const userLogOutUrl = process.env.NEXT_PUBLIC_API_URL + '/auth' + '/logOut'
        const res = await fetch(userLogOutUrl,{
            method: 'GET',
            credentials: "include"
        })
        const resData = await res.json();
        if(resData === true) {
            localStorage.clear();
            location.reload();
        } else {
            console.log('로그인 안되어 있는데 시도 에러');
        }
    }

    useEffect(() => {
        (async()=>{
            // if (location.hostname === 'localhost') return;
            const curUser = await FunctionGetUserInfo();
            if(curUser.email && curUser.name && curUser.provider){
                const globalThis = window as any;
                globalThis.testUser = true;
                setLoginState(true)
            }
        })()
    },[headerOption.boardPageNav])

    const oauthLogin = async (e: React.MouseEvent<HTMLButtonElement>, param: string) => {
        const oauthUrl = process.env.NEXT_PUBLIC_OAUTH_START_LOGIN_URL as string;
        await axios.post(oauthUrl, {method: param}, {
            withCredentials: true
        })
            .then(res => res.data)
            .then(data => {
                const redirectUrl = data.data;
                if(typeof redirectUrl !== 'string') {
                    console.log('실패')
                }else {
                    location.href = redirectUrl;
                }
            })

    }
    const loginBtn = () => {
        return (
            <button
                className="btn btn-sm pr-5 pl-5 bg-eric text-white tooltip tooltip-left"
                data-tip="글쓰기 등 컨텐츠를 사용할 수 있어요!"
                onClick={loginModalOpen}
            >로그인
            </button>
        )
    }
    const loginModalOpen = () => {
        const loginModal = document.getElementById('my_modal_2') as HTMLDialogElement;
        loginModal.showModal();
    }
    const userProfile = () => {
        return (
            <div className={`flex items-center gap-1 border-base-400`}>
                <button className="btn btn-ghost btn-circle">
                    <div className="indicator">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/>
                        </svg>
                        <span className="badge badge-xs badge-primary indicator-item"></span>
                    </div>
                </button>
                <button className="btn btn-ghost btn-circle dropdown dropdown-end relative flex justify-center ">
                        <SvgIcon.User/>
                        <ul tabIndex={0} className="dropdown-content z-[5] menu p-2 shadow bg-gray-100 rounded-box w-32 top-12 font-normal">
                            <li>
                                <p>마이페이지</p>
                            </li>
                            <li onClick={userLogOut}>
                                <p>로그아웃</p>
                            </li>
                        </ul>
                </button>
            </div>
        )
    }

    return (
        <nav className="navbar px-8 border-b-05 border-gray-300 flex justify-center relative">
            <div className={`max-w-6xl w-full flex justify-between`}>
                <Link href={'https://notworking.site/'} className={`btn btn-ghost normal-case font-bold flex items-center gap-2`}>
                    <SvgIcon.TeamIcon/>
                    <p className={``}>Team Not Working</p>
                </Link>
                <div className={`absolute ab-center hidden md:block`}>
                    <ul className={`flex gap-5`}>
                        {
                            headerOption.boardPageNav?.map( (item) =>
                                <li key={item} className={`btn btn-ghost`}>{ item }</li>
                            )
                        }
                    </ul>
                </div>
                <div className="flex-none">
                    <ul className="px-1">
                        <li>
                            {
                                loginState ? userProfile() : loginBtn()
                            }

                            <dialog id="my_modal_2" className="modal">
                                <div className="modal-box flex flex-col justify-center bg-white w-72 py-14">
                                    <div className={`flex flex-col items-center justify-center mb-5`}>
                                        <p className={`font-bold text-lg mb-1 p-1`}>로그인</p>
                                        <div className={`text-center text-sm text-gray-500`}>
                                            <p>걱정마세요!</p>
                                            <p>이름, 이메일만 받습니다.</p>
                                        </div>
                                    </div>
                                    <div className="card flex-shrink-0  gap-4">
                                        <button onClick={
                                            (e) => {
                                                oauthLogin(e, 'google')
                                            }
                                        } className='btn btn-custom btn-google bg-white hover:btn-google'>
                                            <GOOGLE_ICON/>
                                            <p>구글 계정으로 로그인</p>
                                        </button>

                                        <button onClick={
                                            (e) => {
                                                oauthLogin(e, 'github')
                                            }
                                        } className='btn btn-custom bg-github text-white hover:bg-github'>
                                            <GITHUB_ICON/>
                                            <p>깃허브 계정으로 로그인</p>
                                        </button>

                                        <button onClick={
                                            (e) => {
                                                oauthLogin(e, 'kakao')
                                            }
                                        } className='btn btn-custom bg-kakao hover:bg-kakao'>
                                            <KAKAO_ICON/>
                                            <p>카카오 계정으로 로그인</p>
                                        </button>

                                        {/*<button onClick={*/}
                                        {/*    (e) => {*/}
                                        {/*        oauthLogin(e, 'naver')*/}
                                        {/*    }*/}
                                        {/*} className='btn btn-custom bg-naver text-white hover:bg-naver'>*/}
                                        {/*    <NAVER_ICON/>*/}
                                        {/*    <p>네이버 계정으로 로그인</p>*/}
                                        {/*</button>*/}
                                    </div>
                                </div>
                                <form method="dialog" className="modal-backdrop">
                                    <button>close</button>
                                </form>
                            </dialog>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}



