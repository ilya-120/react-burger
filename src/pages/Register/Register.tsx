import { FC, FormEvent, SyntheticEvent, useState } from "react";
import {
  Button,
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import Styles from "./Register.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { registerRequest } from "../../services/actions/amplifierActions/user";
import Modal from "../../components/Modal/Modal";
import ErrorRequest from "../../components/ErrorRequest/ErrorRequest";
import { ERROR_TEXT_GET_REGISTER_USER, IS_LOADING, RESET_ERROR } from "../../services/actions/user";
import { ClipLoader } from "react-spinners";
import { color } from "../../utils/data";
import { AnyAction } from "redux";

const Register: FC = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { errorText, isLoading } = useSelector((store: AnyAction) => store.userData);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    dispatch({
      type: IS_LOADING,
    });
    form.email && form.password && form.name ?
      dispatch((registerRequest as any)(form, () => {
        navigate('/')
      }, reflectErrorRequest))
      :
      dispatch({
        type: ERROR_TEXT_GET_REGISTER_USER,
        payload: "Заполните все поля!",
      });
    setShowModal(true)
  };

  const onChange = (e: SyntheticEvent) => {
    let target = e.target as HTMLInputElement;
    setForm({ ...form, [target.name]: target.value });
  };

  const reflectErrorRequest = () => {
    setShowModal(true)
  }

  return (
    isLoading ? (<span className="message">
      <ClipLoader color={color} loading={isLoading} size={200} />
    </span>) :
      (<form onSubmit={handleSubmit} className={Styles.container}>
        <h2 className="text text_type_main-medium pb-6">Регистрация</h2>
        <Input
          type={"text"}
          placeholder={"Имя"}
          onChange={onChange}
          value={form.name}
          name={"name"}
          error={false}
          errorText={"Ошибка"}
          size={"default"}
        />
        <span className="pb-6"></span>
        <Input
          type={"text"}
          placeholder={"E-mail"}
          value={form.email}
          name={"email"}
          errorText={"Ошибка"}
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
          Зарегистрироваться
        </Button>
        <span className="pb-20"></span>
        <div className={`${Styles["form-container"]}`}>
          <p className="text text_type_main-default text_color_inactive pb-4">
            Уже зарегистрированы?{" "}
            <Link className={`${Styles["form-link"]}`} to="/login">
              Войти
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

export default Register;
