import { useState } from "react";
import {
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import Styles from "./ForgotPassword.module.css";
import { Link, useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [form, setForm] = useState({ email: "" });
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/reset-password')
  };

  const onChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <form onSubmit={handleSubmit} className={Styles.container}>
      <h2 className="text text_type_main-medium pb-6">Восстановление пароля</h2>
      <Input
        type={"text"}
        placeholder={"Укажите e-mail"}
        value={form.email}
        name={"email"}
        errorText={'Ошибка'}
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
    </form>
  );
};

export default ForgotPassword;
