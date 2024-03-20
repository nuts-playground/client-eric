import React, {BaseSyntheticEvent, ChangeEvent, ChangeEventHandler, SyntheticEvent, useEffect, useState} from "react";
import {NumOrUn, StrOrUn} from "@/components/type/wonsi";
import process from "process";
import useUserInfo from "@/hooks/useUserInfo";
import axios from "axios";
import {useSearchParams} from "next/navigation";


interface BoardUpdateProps {
    updateTitle?: string;
    updateContent?: string;
}
const Editor: React.FC<BoardUpdateProps> = ({updateTitle, updateContent}) => {
    const [writeState, setWriteState] = useState<boolean>(true)
    const [alertState, setAlertState] = useState<boolean>(true)
    const {userInfo, deleteUserInfo, setUserInfo} = useUserInfo();
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
    const params = useSearchParams();
    const idParam = params.get('id');
    useEffect(() => {
        if(updateTitle) {
            setTitleState(updateTitle)
        }

        if (updateContent) {
            setContentState(updateContent)
        }
    }, []);
    const [categoryIdState, setCategoryIdState] = useState<string>('1')
    const [titleState, setTitleState] = useState<StrOrUn>()

    const [contentState, setContentState] = useState('');
    const onChangeTitle = (e: BaseSyntheticEvent) => {
        const curTitle = e.target.value;
        setTitleState(curTitle)
    }

    const onChangeContent = (e: BaseSyntheticEvent) => {
        setContentState(String(e.target.value));
    }

    const onChangeCategory = (e: BaseSyntheticEvent) => {
        setCategoryIdState(e.target.value);
    }

    const submitBoardContent = async(e: BaseSyntheticEvent) => {
        setWriteState(false)
        let userEmail;

        if(!userInfo) {
            console.log('에러!')
            alertOn()
            return false;
        } else {
            userEmail = userInfo.email;


            const createValue = {
                category_id: categoryIdState,
                title: titleState,
                content: contentState,
                user_email: userEmail
            }

            const updateValue = {
                content_id: idParam,
                user_email: userEmail,
                category_id: categoryIdState,
                title: titleState,
                content: contentState,
            }

            console.log(updateValue)
            const createBoardUrl = process.env.NEXT_PUBLIC_API_URL + '/board' + '/content'
            const updateFunction = async() => {
                await axios.patch(createBoardUrl, updateValue, {
                    withCredentials: true
                })
                    .then(res => {
                        const successSw = res.data.status === 'success';
                        if(successSw) {
                            setWriteState(true)
                            location.pathname = '/blog'
                        } else {
                            console.log('실패')
                            setWriteState(true)

                        }
                    })
                    .catch(err => {
                        console.log(err)
                        alertOn()
                        setWriteState(true)
                    })
            }
            const createFunction = async() => {
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
                            setWriteState(true)

                        }
                    })
                    .catch(err => {
                        console.log(err)
                        alertOn()
                        setWriteState(true)
                    })
            }

            if (updateTitle && updateContent) {
                await updateFunction()
            } else {
                await createFunction();
            }
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
                <input className={`text-xl w-full h-14 p-4 border rounded`} type="text" placeholder={`제목`} onChange={onChangeTitle} defaultValue={updateTitle?.length !== undefined ? updateTitle : undefined }/>
            </div>
            <textarea
                className="textarea textarea-bordered  bg-white w-full resize-none sm:h-2/3 h-3/4"
                placeholder="본문 내용을 적어주세요."
                onChange={onChangeContent}
                defaultValue={updateContent?.length !== undefined ? updateContent : undefined}
            ></textarea>
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

export default Editor;
