import process from "process";

export async function FunctionGetUserInfo() {
    if (location.hostname === 'localhost') return;
    const userInfoUrl = process.env.NEXT_PUBLIC_USER_INFO_URL as string;
    const res = await fetch(userInfoUrl,{
        method: 'GET',
        credentials: "include"
    })
    const resJson = await res.json();
    if(resJson.status !== 'error') {
        localStorage.setItem('cur-user-info',JSON.stringify(resJson.data));
    }
    return await resJson.data;
}
