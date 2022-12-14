import { FC, FormEvent, useState } from "react";
import {
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import Styles from "./ForgotPassword.module.css";
import { Link, useNavigate } from "react-router-dom";
import {
  ERROR_TEXT_POST_FORGOT_PASSWORD,
  IS_LOADING,
  RESET_ERROR,
} from "../../services/actions/user";
import { forgotPasswordRequest } from "../../services/actions/amplifierActions/user";
import Modal from "../../components/Modal/Modal";
import ErrorRequest from "../../components/ErrorRequest/ErrorRequest";
import { ClipLoader } from "react-spinners";
import { color } from "../../utils/data";

import { useAppDispatch, useAppSelector } from "../../hooks/hook";
import { useForm } from "../../hooks/useForm";

const ForgotPassword: FC = () => {
  const [showModal, setShowModal] = useState(false);
  const dispatch = useAppDispatch();
  const { errorText, isLoading } = useAppSelector((state) => state.userData);
  const {form, onChange} = useForm({ email: "" });
  const navigate = useNavigate();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    dispatch({
      type: IS_LOADING,
    });
    form.email
      ? dispatch(
          forgotPasswordRequest(
            form,
            () => {
              navigate("/reset-password");
            },
            reflectErrorRequest
          )
        )
      : dispatch({
          type: ERROR_TEXT_POST_FORGOT_PASSWORD,
          payload: "Заполните поле!",
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
      <Input
        type={"text"}
        placeholder={"Укажите e-mail"}
        value={form.email!}
        name={"email"}
        errorText={"Ошибка"}
        error={false}
        onChange={onChange}
        size={"default"}
      />
      <span className="pb-6"></span>
      <Button htmlType="submit" type="primary" size="medium">
        Восстановить
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

export default ForgotPassword;
