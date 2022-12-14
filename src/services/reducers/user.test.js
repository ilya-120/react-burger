import * as types from "../actions/user";
import { userReducer, initialState } from "./user";

describe("userReducer", () => {
  it("should return the initial state", () => {
    expect(userReducer(undefined, {})).toEqual(initialState);
  });

  it("should handle REGISTER_USER_SUCCESS", () => {
    const payload = {};
    expect(
      userReducer(initialState, {
        type: types.REGISTER_USER_SUCCESS,
        payload,
      })
    ).toEqual(
      expect.objectContaining({
        ...initialState,
        userInfo: payload,
        success: true,
        isLoading: false,
        isLogin: true,
      })
    );
  });

  it("should handle ERROR_TEXT_GET_REGISTER_USER", () => {
    const payload = "Ошибка";
    expect(
      userReducer(initialState, {
        type: types.ERROR_TEXT_GET_REGISTER_USER,
        payload,
      })
    ).toEqual(
      expect.objectContaining({
        ...initialState,
        errorText: payload,
        isLoading: false,
      })
    );
  });

  it("should handle LOGIN_USER_SUCCESS", () => {
    const payload = {};
    expect(
      userReducer(initialState, {
        type: types.LOGIN_USER_SUCCESS,
        payload,
      })
    ).toEqual(
      expect.objectContaining({
        ...initialState,
        userInfo: payload,
        success: true,
        isLoading: false,
        isLogin: true,
      })
    );
  });

  it("should handle ERROR_TEXT_GET_LOGIN_USER", () => {
    const payload = "Ошибка";
    expect(
      userReducer(initialState, {
        type: types.ERROR_TEXT_GET_LOGIN_USER,
        payload,
      })
    ).toEqual(
      expect.objectContaining({
        ...initialState,
        errorText: payload,
        isLoading: false,
      })
    );
  });

  it("should handle USER_INFO_DATA_SUCCESS", () => {
    const payload = {};
    expect(
      userReducer(initialState, {
        type: types.USER_INFO_DATA_SUCCESS,
        payload,
      })
    ).toEqual(
      expect.objectContaining({
        ...initialState,
        userInfo: payload,
        success: true,
        isLoading: false,
        isLogin: true,
      })
    );
  });

  it("should handle ERROR_TEXT_GET_USER_INFO", () => {
    const payload = "Ошибка";
    expect(
      userReducer(initialState, {
        type: types.ERROR_TEXT_GET_USER_INFO,
        payload,
      })
    ).toEqual(
      expect.objectContaining({
        ...initialState,
        errorText: payload,
        isLoading: false,
      })
    );
  });

  it("should handle UPDATE_USER_SUCCESS", () => {
    const payload = {};
    expect(
      userReducer(initialState, {
        type: types.UPDATE_USER_SUCCESS,
        payload,
      })
    ).toEqual(
      expect.objectContaining({
        ...initialState,
        userInfo: payload,
        success: true,
        isLoading: false,
        isLogin: true,
      })
    );
  });

  it("should handle ERROR_TEXT_PATCH_UPDATE_USER", () => {
    const payload = "Ошибка";
    expect(
      userReducer(initialState, {
        type: types.ERROR_TEXT_PATCH_UPDATE_USER,
        payload,
      })
    ).toEqual(
      expect.objectContaining({
        ...initialState,
        errorText: payload,
        isLoading: false,
      })
    );
  });

  it("should handle RESET_ERROR", () => {
    expect(
      userReducer(initialState, {
        type: types.RESET_ERROR,
      })
    ).toEqual(
      expect.objectContaining({
        ...initialState,
        errorText: "",
        success: false,
        isLoading: false,
      })
    );
  });

  it("should handle IS_LOADING", () => {
    expect(
      userReducer(initialState, {
        type: types.IS_LOADING,
      })
    ).toEqual(
      expect.objectContaining({
        ...initialState,
        isLoading: true,
      })
    );
  });

  it("should handle RESET_IS_LOADING", () => {
    expect(
      userReducer(initialState, {
        type: types.RESET_IS_LOADING,
      })
    ).toEqual(
      expect.objectContaining({
        ...initialState,
        isLoading: false,
      })
    );
  });

  it("should handle LOGOUT_USER", () => {
    expect(
      userReducer(initialState, {
        type: types.LOGOUT_USER,
      })
    ).toEqual(
      expect.objectContaining({
        ...initialState,
        userInfo: {},
        success: true,
        isLogin: false,
      })
    );
  });

  it("should handle ERROR_TEXT_POST_LOGOUT_USER", () => {
    const payload = "Ошибка";
    expect(
      userReducer(initialState, {
        type: types.ERROR_TEXT_POST_LOGOUT_USER,
        payload,
      })
    ).toEqual(
      expect.objectContaining({
        ...initialState,
        errorText: payload,
      })
    );
  });

  it("should handle FORGOT_PASSWORD_SUCCESS", () => {
    expect(
      userReducer(initialState, {
        type: types.FORGOT_PASSWORD_SUCCESS,
      })
    ).toEqual(
      expect.objectContaining({
        ...initialState,
        forgotSuccess: true,
        isLoading: false,
      })
    );
  });

  it("should handle ERROR_TEXT_POST_FORGOT_PASSWORD", () => {
    const payload = "Ошибка";
    expect(
      userReducer(initialState, {
        type: types.ERROR_TEXT_POST_FORGOT_PASSWORD,
        payload,
      })
    ).toEqual(
      expect.objectContaining({
        ...initialState,
        errorText: payload,
        isLoading: false,
      })
    );
  });

  it("should handle RESET_PASSWORD_SUCCESS", () => {
    expect(
      userReducer(initialState, {
        type: types.RESET_PASSWORD_SUCCESS,
      })
    ).toEqual(
      expect.objectContaining({
        ...initialState,
        forgotSuccess: true,
        isLoading: false,
      })
    );
  });

  it("should handle ERROR_TEXT_POST_RESET_PASSWORD", () => {
    const payload = "Ошибка";
    expect(
      userReducer(initialState, {
        type: types.ERROR_TEXT_POST_RESET_PASSWORD,
        payload,
      })
    ).toEqual(
      expect.objectContaining({
        ...initialState,
        errorText: payload,
        isLoading: false,
      })
    );
  });
});
