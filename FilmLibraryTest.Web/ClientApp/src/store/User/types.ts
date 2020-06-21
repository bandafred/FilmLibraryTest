import {UserLoginViewModel} from "../../apiClient/apiClient";

export interface UserState {
    UserInfo: UserLoginViewModel | undefined;
}

export const SET_USER_INFO = 'SET_USER_INFO';

interface SetUserInfoAction {
    type: typeof SET_USER_INFO,
    userInfo: UserLoginViewModel | undefined
}

export type UserKnownAction = SetUserInfoAction;