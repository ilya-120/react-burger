import { useState } from "react";
import {
  Button,
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import Styles from "./ResetPassword.module.css";
import { Link, useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const [form, setForm] = useState({ password: "", token: "" });
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/");
  };

  const onChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <form onSubmit={handleSubmit} className={Styles.container}>
      <h2 className="text text_type_main-medium pb-6">Восстановление пароля</h2>
      <PasswordInput
        value={form.password}
        placeholder={"Введите новый пароль"}
        name={"password"}
        onChange={onChange}
      />
      <span className="pb-6"></span>
      <Input
        type={"text"}
        placeholder={"Введите код из письма"}
        onChange={onChange}
        value={form.token}
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
    </form>
  );
};

export default ResetPassword;
