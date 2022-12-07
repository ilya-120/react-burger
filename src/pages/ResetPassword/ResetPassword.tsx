import { FC, FormEvent, useState } from "react";
import {
  Button,
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import Styles from "./ResetPassword.module.css";
import { Link, useNavigate } from "react-router-dom";
import {
  ERROR_TEXT_POST_RESET_PASSWORD,
  IS_LOADING,
  RESET_ERROR,
} from "../../services/actions/user";
import { resetPasswordRequest } from "../../services/actions/amplifierActions/user";
import ErrorRequest from "../../components/ErrorRequest/ErrorRequest";
import Modal from "../../components/Modal/Modal";
import { color } from "../../utils/data";
import { ClipLoader } from "react-spinners";

import { useAppDispatch, useAppSelector } from "../../hooks/hook";
import { useForm } from "../../hooks/useForm";

const ResetPassword: FC = () => {
  const [showModal, setShowModal] = useState(false);
  const dispatch = useAppDispatch();
  const { errorText, isLoading } = useAppSelector((state) => state.userData);
  const {form, onChange} = useForm({ password: "", token: "" });
  const navigate = useNavigate();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    dispatch({
      type: IS_LOADING,
    });
    form.password && form.token
      ? dispatch(
          resetPasswordRequest(
            form,
            () => {
              navigate("/login");
            },
            reflectErrorRequest
          )
        )
      : dispatch({
          type: ERROR_TEXT_POST_RESET_PASSWORD,
          payload: "Заполните все поля!",
        });
    setShowModal(true);
  };

  const reflectErrorRequest = () => {
    setShowModal(true);
  };

  return isLoading ? (
    <span className="message">
      <ClipLoader color={color} loading={isLoading} size={200} />
    </span>
  ) : (
    <form onSubmit={handleSubmit} className={Styles.container}>
      <h2 className="text text_type_main-medium pb-6">Восстановление пароля</h2>
      <PasswordInput
        value={form.password!}
        placeholder={"Введите новый пароль"}
        name={"password"}
        onChange={onChange}
      />
      <span className="pb-6"></span>
      <Input
        type={"text"}
        placeholder={"Введите код из письма"}
        onChange={onChange}
        value={form.token!}
        name={"token"}
        size={"default"}
      />
      <span className="pb-6"></span>
      <Button htmlType="submit" type="primary" size="medium">
        Сохранить
      </Button>
      <span className="pb-20"></span>
      <div className={`${Styles["form-container"]}`}>
        <p className="text text_type_main-default text_color_inactive pb-4">
          Вспомнили пароль?{" "}
          <Link className={`${Styles["form-link"]}`} to="/login">
            Войти
          </Link>
        </p>
      </div>
      {errorText && showModal && (
        <Modal
          title={"Произошла ошибка"}
          onClose={() => {
            setShowModal(false);
            dispatch({
              type: RESET_ERROR,
            });
          }}
        >
          <ErrorRequest />
        </Modal>
      )}
    </form>
  );
};

export default ResetPassword;
