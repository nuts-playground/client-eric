import { create } from 'zustand';
import { persist } from "zustand/middleware";
interface UserInfoType {
    email: string;
    name: string;
    provider: string;
}

interface UserInfoState {
    userInfo: UserInfoType
}

interface UserInfoActions {
    setUserInfo: (userinfo: UserInfoType) => void
    deleteUserInfo: () => void
}

const defaultState = { email: '', name: '', provider: '' }

const useUserInfo = create(
    persist<UserInfoState & UserInfoActions>(
        (set, get) => ({
            userInfo: defaultState,
            setUserInfo: (userInfo: UserInfoType) => {set({ userInfo })},
            deleteUserInfo: () => {set({userInfo: defaultState})}
        }),
        {
            name: "userInfo",
        }
    )
);

export default useUserInfo
