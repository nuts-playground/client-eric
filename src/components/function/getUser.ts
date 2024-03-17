import process from "process";

export async function FunctionGetUserInfo() {
    const userInfoUrl = process.env.NEXT_PUBLIC_USER_INFO_URL as string;
    const res = await fetch(userInfoUrl,{
        method: 'GET',
        credentials: "include"
    })
    const resJson = await res.json();
    return await resJson.data;
}
