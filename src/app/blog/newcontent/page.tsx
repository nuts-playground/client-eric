'use client'
import Header from "@/components/header";
import Editor from "@/components/board/editor";
import {useEffect, useState} from "react";
import process from "process";
import {SuccessAlert} from "@/components/alert";

export default function BlogNewContent() {
    useEffect(() => {
        if(!localStorage.getItem('cur-user-info')) {
            history.back()
        }
    }, []);
    return (
        <main className={`h-full flex flex-col`}>
            <Header/>
            <section className={`p-12`}>
                <Editor/>
            </section>
        </main>
    )
}
