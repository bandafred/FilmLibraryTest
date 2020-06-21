import {baseUrl} from "../../apiClient/baseUrl";
import {setUserInfo} from "./actions";
import {AppActionWithDispatch} from "../index";
import {
    AccountClient,
    LoginViewModel, RegisterViewModel,
    UserToTokenViewModel
} from "../../apiClient/apiClient";

export const getUserInfo = (): AppActionWithDispatch => async dispatch => {
    try {
        let token = localStorage.getItem("apiToken");
        if (token) {
            let client = new AccountClient(baseUrl);
            let model: UserToTokenViewModel = {token: token}
            let result = await client.getUserToToken(model);

            if (!result.error) {
                dispatch(setUserInfo(result.result));
            }
        } else
            dispatch(setUserInfo(undefined));
    } catch (error) {
        dispatch(setUserInfo(undefined));
    }
};

//Имитация логаута
export const logout = (): AppActionWithDispatch => async dispatch => {
    try {
        let token = localStorage.getItem("apiToken");
        if (token) {
            //Здесь отправка на сервер запроса на логаут
        }
    } catch (error) {

    }
    localStorage.removeItem("apiToken");
    dispatch(setUserInfo(undefined));
};

export const register = (email: string, password: string): AppActionWithDispatch<Promise<string | undefined>> => async dispatch => {
    try {
        let client = new AccountClient(baseUrl);
        let model: RegisterViewModel = {email: email, password: password};
        let result = await client.register(model);

        if (result.error) return result.error;

        if (result.result) {
            localStorage.setItem('apiToken', result.result);
        }
        await getUserInfo()(dispatch);
        return undefined;
    } catch (error) {
        return error;
    }
};

export const loginUser = (email: string, password: string): AppActionWithDispatch<Promise<string | undefined>> => async dispatch => {
    try {
        let model: LoginViewModel = {email: email, password: password}
        let client = new AccountClient(baseUrl);

        let result = await client.login(model);

        if (result?.result) {
            localStorage.setItem('apiToken', result.result.token as string);
        }
        dispatch(setUserInfo(result.result));

        return result.error

    } catch (error) {
        return error;
    }
};

