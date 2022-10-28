import { useState } from "react";
import {
  Button,
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import Styles from "./Register.module.css";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { registerRequest } from "../../services/actions/amplifierActions/user";

const Register = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const dispatch = useDispatch()


  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(registerRequest(form))
  };

  const onChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <form onSubmit={handleSubmit} className={Styles.container}>
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
    </form>
  );
};

export default Register;
