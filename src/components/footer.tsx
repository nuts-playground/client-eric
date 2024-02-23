import React from "react";

const Footer: React.FC<any> = () => {
    return (
        <footer className="footer px-8 py-4 text-base-content border-t-05 border-gray-300 flex justify-center items-center">
            <div className={`w-full flex max-w-6xl gap-5 flex-wrap justify-between`}>
                <nav className={`w-56`}>
                    <header className="footer-title opacity-100 normal-case">Team Not Working</header>
                    <div className={`text-gray-500 flex flex-col gap-2`}>
                        <p>팀 소개</p>
                        <p>우리의 방향</p>
                    </div>
                </nav>
                <nav className={`w-56`}>
                    <header className="footer-title opacity-100">멤버 현황</header>
                    <div className={`text-gray-500 flex gap-5`}>
                        <div className={`flex flex-col gap-2`}>
                            <p>아이언</p>
                            <p>호세</p>
                            <p>조니</p>
                        </div>
                        <div className={`flex flex-col gap-2`}>
                            <p>오스틴</p>
                            <p>에릭</p>
                            <p>테오</p>
                        </div>
                        <div className={`flex flex-col gap-2`}>
                            <p>그린</p>
                        </div>
                    </div>
                </nav>
                <nav className={`w-56`}>
                    <header className="footer-title opacity-100">문의</header>
                    <div className={`text-gray-500 flex flex-col gap-2`}>
                        <p className={``}>이메일: rkwhr9856@gmail.com</p>
                    </div>
                </nav>
            </div>
        </footer>
    )
}

export default Footer;
