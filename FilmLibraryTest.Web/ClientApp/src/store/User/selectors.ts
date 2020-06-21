﻿import {createSelector} from "reselect";
import {ApplicationState} from "../index";
import {UserLoginViewModel} from "../../apiClient/apiClient";
import {UserState} from "./types";

export const userInfoSelector =
    createSelector<ApplicationState, UserState | undefined, UserLoginViewModel | null | undefined>(
        state => state.user,
        user => user?.UserInfo);