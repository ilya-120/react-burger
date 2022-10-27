import { useState } from "react";
import {
  Button,
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import Styles from "./Login.module.css";
import { Link } from "react-router-dom";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const onChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <form onSubmit={handleSubmit} className={Styles.container}>
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
    </form>
  );
};

export default Login;
