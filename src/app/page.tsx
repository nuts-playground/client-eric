'use client'

import Header from "@/components/header";
import Loading from "@/components/loading";
import ContentCard from "@/components/content-card";
import * as SvgIcons from '../../public/icon/index-svg';
import Footer from "@/components/footer";
import React, {useEffect, useState} from "react";
export default function Home() {
    const [actionState, setActionState] = useState(false);

    useEffect(() => {
        setActionState(true)
    },[])
    return (
      <main className={`h-full flex flex-col justify-between `}>
          <Header/>
          {
              !actionState ? <Loading/> :
                  <section className={`p-12 flex justify-center `}>
                      <div className=" max-w-6xl w-full flex flex-col items-center justify-center">
                          <div className="hero-content text-center mb-3 p-0 relative">
                              <div className="max-w-md">
                                  <h1 className="text-4xl font-bold">안녕하세요 🙇</h1>
                                  <p className={`pt-3 pb-6`}>저는 이런 걸 만들 예정입니다!</p>
                              </div>
                          </div>
                          <div className={`w-full`}>
                              <ul className={`w-full flex flex-wrap justify-center gap-3`}>
                                  <li>
                                      <ContentCard
                                          skillIcons={[
                                              SvgIcons.Ts,
                                              SvgIcons.Aws,
                                              SvgIcons.Next,
                                          ]}
                                          title="Nuts-playgroud"
                                          description="🗂 팀원들의 프로젝트를 공유하는 저장소"
                                          pageLink={`https://github.com/nuts-playground`}
                                      />
                                  </li>
                                  <li>
                                      <ContentCard
                                          skillIcons={[
                                              SvgIcons.Ts,
                                              SvgIcons.Aws,
                                              SvgIcons.Next,
                                              SvgIcons.Nest,
                                              SvgIcons.Mysql,
                                              SvgIcons.GithubAction
                                          ]}
                                          title="[진행 중] 내 마음대로 블로그"
                                          description="📚 만들어보면서 연습하는 NestJs, Next.js"
                                          pageLink={`/blog`}
                                      />
                                  </li>
                                  <li>
                                      <ContentCard
                                          skillIcons={[]}
                                          title="[예정] 홈택스 - 개인용 데이터"
                                          description="냐옹"
                                          pageLink={`/`}
                                      />
                                  </li>
                                  <li>
                                      <ContentCard
                                          skillIcons={[]}
                                          title="[예정] 국민 건강보험 - 개인용 데이터"
                                          description="냐옹"
                                          pageLink={`/`}
                                      />
                                  </li>
                                  <li>
                                      <ContentCard
                                          skillIcons={[]}
                                          title="[예정] 국토교통부 - 공시지가, 공시가격"
                                          description="냐옹"
                                          pageLink={`/`}
                                      />
                                  </li>
                                  <li>
                                      <ContentCard
                                          skillIcons={[]}
                                          title="[예정] 대용량 크롤링 봇 - 도메인 미정"
                                          description="냐옹"
                                          pageLink={`/`}
                                      />
                                  </li>
                                  <li>
                                      <ContentCard
                                          skillIcons={[]}
                                          title="[예정] 스크래핑 회피 기법 안내 솔루션"
                                          description="냐옹"
                                          pageLink={`/`}
                                      />
                                  </li>
                                  <li>
                                      <ContentCard
                                          skillIcons={[]}
                                          title="[예정] Jetbrains용 테스트 코드 프리셋 플러그인 - 개인용"
                                          description="냐옹"
                                          pageLink={`/`}
                                      />
                                  </li>
                              </ul>
                          </div>
                      </div>
                  </section>
          }
          <Footer/>
      </main>
    )
}
