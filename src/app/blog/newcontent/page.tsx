'use client'
import Header from "@/components/header";
import Editor from "@/components/board/editor";
import {useEffect, useState} from "react";
import process from "process";
import {SuccessAlert} from "@/components/alert";
import useUserInfo from "@/hooks/useUserInfo";

export default function BlogNewContent() {
    const {userInfo} = useUserInfo()
    useEffect(() => {
        if(!userInfo) {
            history.back()
        }
    }, [userInfo]);
    return (
        <main className={`h-full flex flex-col`}>
            <Header/>
            <section className={`p-12 h-full box-border`}>
                <Editor/>
            </section>
        </main>
    )
}
