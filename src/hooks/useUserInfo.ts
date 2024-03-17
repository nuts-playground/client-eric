import { create } from 'zustand';

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

const useUserInfo  = create<UserInfoState & UserInfoActions>((set) => ({
    userInfo: defaultState,
    setUserInfo: (userInfo: UserInfoType) => {set({ userInfo })},
    deleteUserInfo: () => {set({userInfo: defaultState})}
}))

export default useUserInfo