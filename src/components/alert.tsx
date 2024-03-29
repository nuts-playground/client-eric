import React from "react";

interface AlertText {
    text?: string
}
export function SuccessAlert () {
    return (
        <div role="alert" className="alert alert-success">
            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
            <span>Your purchase has been confirmed!</span>
        </div>
    )
}

const FailAlert: React.FC<AlertText> = ({text}) => {
    return (
        <div role="alert" className="alert alert-error mb-4 flex relative animate-fade" >
            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
            <span className={`absolute ab-center`}>{text ? text : '에러'}</span>
        </div>
    )
}

export default FailAlert
