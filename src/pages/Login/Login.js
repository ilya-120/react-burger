import { useState } from "react";
import {
  Button,
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import Styles from "./Login.module.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginRequest } from "../../services/actions/amplifierActions/user";
import { ERROR_TEXT_GET_LOGIN_USER, IS_LOADING, RESET_ERROR } from "../../services/actions/user";
import ErrorRequest from "../../components/ErrorRequest/ErrorRequest";
import Modal from "../../components/Modal/Modal";
import { ClipLoader } from "react-spinners";
import { color } from "../../utils/data";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const { errorText, isLoading } = useSelector((store) => store.userData);
  const fromPage = location.state?.from?.pathname || '/';

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch({
      type: IS_LOADING,
    });
    form.email && form.password ?
      dispatch(loginRequest(form, nav, reflectErrorRequest))
      :
      dispatch({
        type: ERROR_TEXT_GET_LOGIN_USER,
        payload: "Заполните все поля!",
      });
    setShowModal(true)
  };

  const onChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const reflectErrorRequest = () => {
    setShowModal(true)
  }

  const nav = () => {
      navigate(fromPage)
  }

  return (
    isLoading ? (<span className="message">
      <ClipLoader color={color} loading={isLoading} size={200} />
    </span>) :
      (<form onSubmit={handleSubmit} className={Styles.container}>
        <h2 className="text text_type_main-medium pb-6">Вход</h2>
        <Input
          type={"text"}
          placeholder={"E-mail"}
          value={form.email}
          name={"email"}
          errorText={'Ошибка'}
          error={false}
          onChange={onChange}
          size={"default"}
        />
        <span className="pb-6"></span>
        <PasswordInput
          value={form.password}
          name={"password"}
          onChange={onChange}
        />
        <span className="pb-6"></span>
        <Button htmlType="submit" type="primary" size="medium">
          Войти
        </Button>
        <span className="pb-20"></span>
        <div className={`${Styles["form-container"]}`}>
          <p className="text text_type_main-default text_color_inactive pb-4">
            Вы - новый пользователь?{" "}
            <Link className={`${Styles["form-link"]}`} to="/register">
              Зарегистрироваться
            </Link>
          </p>
          <p className="text text_type_main-default text_color_inactive">
            Забыли пароль?{" "}
            <Link className={`${Styles["form-link"]}`} to="/forgot-password">
              Восстановить пароль
            </Link>
          </p>
        </div>
        {errorText && showModal && (
          <Modal
            title={'Произошла ошибка'}
            onClose={() => {
              setShowModal(false);
              dispatch({
                type: RESET_ERROR,
              });
            }}>
            <ErrorRequest />
          </Modal>
        )}
      </form>)
  );
};

export default Login;
