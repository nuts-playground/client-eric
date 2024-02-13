import MDEditor, { commands } from "@uiw/react-md-editor";
import { useState } from "react";

export default function Editor() {
    const [contentValue, setContentValue] = useState<string>();
    return (
        <div className={`p-8 `}>
            <div className={`mb-5`}>
                <input className={`text-xl w-full h-14 p-4 border rounded`} type="text" placeholder={`제목`}/>
            </div>
            <MDEditor

                className={`mb-5`}
                data-color-mode={'light'}
                height={700}
                minHeight={700}
                highlightEnable={false}
                value={contentValue}
                preview={`edit`}
                commands={[
                    commands.hr,
                    commands.quote,
                    commands.divider,

                    commands.bold,
                    commands.strikethrough,
                    commands.codeBlock,
                    commands.comment,
                    commands.divider,

                    commands.link,
                    commands.table,
                    commands.orderedListCommand,
                ]}
                onChange={setContentValue}>
            </MDEditor>
            <div className={`flex gap-2 justify-center`}>
                <button className={`btn text-white bg-eric`}>
                    등록하기
                </button>
                <button className={`btn`}>
                    취소하기
                </button>
            </div>
        </div>
    )
}
