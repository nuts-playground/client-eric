'use client'
import Header from "@/components/header";
import Editor from "@/components/board/editor";
import Footer from "@/components/footer";

export default function BlogMain() {
    return (
        <main className={`h-full flex flex-col justify-between`}>
            <Header/>
            <section className={`p-12`}>
                <p>블로그 메인</p>
            </section>
            <Footer/>
        </main>
    )
}
