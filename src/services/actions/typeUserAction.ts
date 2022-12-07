import { TUserDataForm } from "../../utils/typeData";
import {
  ERROR_TEXT_GET_LOGIN_USER,
  ERROR_TEXT_GET_REGISTER_USER,
  ERROR_TEXT_GET_USER_INFO,
  ERROR_TEXT_PATCH_UPDATE_USER,
  ERROR_TEXT_POST_FORGOT_PASSWORD,
  ERROR_TEXT_POST_LOGOUT_USER,
  ERROR_TEXT_POST_RESET_PASSWORD,
  FORGOT_PASSWORD_SUCCESS,
  LOGIN_USER_SUCCESS,
  LOGOUT_USER,
  REGISTER_USER_SUCCESS,
  RESET_IS_LOADING,
  RESET_PASSWORD_SUCCESS,
  UPDATE_USER_SUCCESS,
  USER_INFO_DATA_SUCCESS,
  RESET_ERROR,
  IS_LOADING,
} from "./user";

export interface IErrorTextGetLoginUser {
  payload: string | null;
  readonly type: typeof ERROR_TEXT_GET_LOGIN_USER;
}

export interface IErrorTextGetRegisterUser {
  payload: string | null;
  readonly type: typeof ERROR_TEXT_GET_REGISTER_USER;
}

export interface IErrorTextGetUserInfo {
  payload: string | null;
  readonly type: typeof ERROR_TEXT_GET_USER_INFO;
}

export interface IErrorTextPatchUpdateUser {
  payload: string | null;
  readonly type: typeof ERROR_TEXT_PATCH_UPDATE_USER;
}

export interface IErrorTextPostForgotPassword {
  payload: string | null;
  readonly type: typeof ERROR_TEXT_POST_FORGOT_PASSWORD;
}

export interface IErrorTextPostLogoutUser {
  payload: string | null;
  readonly type: typeof ERROR_TEXT_POST_LOGOUT_USER;
}

export interface IErrorTextPostResetPassword {
  payload: string | null;
  readonly type: typeof ERROR_TEXT_POST_RESET_PASSWORD;
}

export interface IForgotPasswordSuccess {
  readonly type: typeof FORGOT_PASSWORD_SUCCESS;
}

export interface ILoginUserSuccess {
  payload: TUserDataForm | null;
  readonly type: typeof LOGIN_USER_SUCCESS;
}

export interface ILogoutUser {
  readonly type: typeof LOGOUT_USER;
}

export interface IRegisterUserSuccess {
  payload: TUserDataForm | null;
  readonly type: typeof REGISTER_USER_SUCCESS;
}

export interface IResetIsLoading {
  readonly type: typeof RESET_IS_LOADING;
}

export interface IResetPasswordSuccess {
  readonly type: typeof RESET_PASSWORD_SUCCESS;
}

export interface IUpdateUserSuccess {
  payload: TUserDataForm | null;
  readonly type: typeof UPDATE_USER_SUCCESS;
}

export interface IUserInfoDataSuccess {
  payload: TUserDataForm | null;
  readonly type: typeof USER_INFO_DATA_SUCCESS;
}

export interface IResetError {
  readonly type: typeof RESET_ERROR;
}

export interface IIsLoading {
  readonly type: typeof IS_LOADING;
}

export type TUserActions =
  | IErrorTextGetLoginUser
  | IErrorTextGetRegisterUser
  | IErrorTextGetUserInfo
  | IErrorTextPatchUpdateUser
  | IErrorTextPostForgotPassword
  | IErrorTextPostLogoutUser
  | IErrorTextPostResetPassword
  | IForgotPasswordSuccess
  | ILoginUserSuccess
  | ILogoutUser
  | IRegisterUserSuccess
  | IResetIsLoading
  | IResetPasswordSuccess
  | IUpdateUserSuccess
  | IUserInfoDataSuccess
  | IResetError
  | IIsLoading;
