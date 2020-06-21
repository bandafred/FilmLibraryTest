import {UserLoginViewModel} from "../../apiClient/apiClient";
import {SET_USER_INFO, UserKnownAction} from "./types";


export function setUserInfo(userInfo: UserLoginViewModel | undefined): UserKnownAction {
    return {
        type: SET_USER_INFO,
        userInfo: userInfo
    }
}