import MDEditor, { commands } from "@uiw/react-md-editor";
import React, {BaseSyntheticEvent, ChangeEvent, ChangeEventHandler, SyntheticEvent, useEffect, useState} from "react";
import {NumOrUn, StrOrUn} from "@/components/type/wonsi";
import process from "process";
import axios from "axios";
import FailAlert from "@/components/alert";

export default function Editor() {
    const [writeState, setWriteState] = useState<boolean>(true)
    const [alertState, setAlertState] = useState<boolean>(true)
    const alertOn = () => {
        setAlertState(false)
        setTimeout(() => {
            setAlertState(true)
        }, 1000)
    }
    const testCategory = [
        {
            title: '자유게시판',
            id: 1
        },
    ]
    const [categoryIdState, setCategoryIdState] = useState<string>('1')
    const [titleState, setTitleState] = useState<StrOrUn>()

    const [contentState, setContentState] = useState<string>();
    const onChangeTitle = (e: BaseSyntheticEvent) => {
        const curTitle = e.target.value;
        setTitleState(curTitle)
    }

    const onChangeCategory = (e: BaseSyntheticEvent) => {
        setCategoryIdState(e.target.value);
    }

    const submitBoardContent = async(e: BaseSyntheticEvent) => {
        setWriteState(false)
        let userEmail;
        let checkInfo= localStorage.getItem('cur-user-info');
        let checkInfoSuccess = (checkInfo && checkInfo.length > 0)
        if(!checkInfoSuccess) {
            console.log('에러!')
            alertOn()
            return false;
        } else {
            userEmail = JSON.parse(checkInfo as string).email;

            const createValue = {
                category_id: categoryIdState,
                title: titleState,
                content: contentState,
                user_email: userEmail
            }

            const createBoardUrl = process.env.NEXT_PUBLIC_API_URL + '/board' + '/createBoardContent'
            await axios.post(createBoardUrl, createValue, {
                withCredentials: true
            })
            .then(res => {
                const successSw = res.data.status === 'success';
                if(successSw) {
                    setWriteState(true)
                    location.pathname = '/blog'
                } else {
                    console.log('실패')
                    alertOn()
                }
            })
            .catch(err => {
                console.log(err)
                alertOn()
                setWriteState(true)
            })
        }
    }

    const backAction = () => {
        history.back()
    }

    return (
        <div className={`h-full`}>
            <div className={`mb-5`}>
                <select className="select max-w-xs bg-gray-300" defaultValue={'1'} onChange={onChangeCategory}>
                    {
                        testCategory.map((item) =>
                            <option value={item.id} key={item.id}>{item.title}</option>
                        )
                    }
                </select>
            </div>
            <div className={`mb-5`}>
                <input className={`text-xl w-full h-14 p-4 border rounded`} type="text" placeholder={`제목`} onChange={onChangeTitle}/>
            </div>
            {/*<MDEditor*/}
            {/*    className={`mb-5`}*/}
            {/*    data-color-mode={'light'}*/}
            {/*    height={500}*/}
            {/*    minHeight={500}*/}
            {/*    maxHeight={800}*/}
            {/*    highlightEnable={false}*/}
            {/*    value={contentState}*/}
            {/*    preview={`edit`}*/}
            {/*    commands={[*/}
            {/*        commands.hr,*/}
            {/*        commands.quote,*/}
            {/*        commands.divider,*/}

            {/*        commands.bold,*/}
            {/*        commands.strikethrough,*/}
            {/*        commands.codeBlock,*/}
            {/*        commands.comment,*/}
            {/*        commands.divider,*/}

            {/*        commands.link,*/}
            {/*        commands.table,*/}
            {/*        commands.orderedListCommand,*/}
            {/*    ]}*/}
            {/*    onChange={setContentState}>*/}
            {/*</MDEditor>*/}
            <textarea className="textarea textarea-bordered bg-white w-full resize-none sm:h-2/3 h-3/4" placeholder="본문 내용을 적어주세요."></textarea>
            <div className={`flex gap-2 justify-center my-5`}>
                {
                    writeState ?
                        <button className={`btn text-white bg-eric`} onClick={submitBoardContent}>
                            <span>등록하기</span>
                        </button>
                        :
                        <button className="btn btn-square">
                            <span className="loading loading-spinner"></span>
                        </button>
                }
                <button className={`btn bg-gray-300`} onClick={backAction}>취소하기</button>
            </div>
        </div>
    )
}
