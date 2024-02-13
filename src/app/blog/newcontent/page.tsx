'use client'
import Header from "@/components/header";
import Editor from "@/components/board/editor";

export default function BlogNewContent() {
    return (
        <main className={`h-full flex flex-col`}>
            <Header/>
            <section className={`p-12`}>
                <Editor/>
            </section>

        </main>
    )
}
