import { useState } from "react";
import {
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import Styles from "./UserProfile.module.css";

const UserProfile = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const onChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <form onSubmit={handleSubmit} className={Styles.container}>
      <Input
        type={"text"}
        placeholder={"Имя"}
        onChange={onChange}
        value={form.name}
        name={"name"}
        error={false}
        errorText={"Ошибка"}
        size={"default"}
        icon={"EditIcon"}
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
        icon={"EditIcon"}
      />
      <span className="pb-6"></span>
      <PasswordInput
        value={form.password}
        name={"password"}
        onChange={onChange}
        icon={"EditIcon"}
      />
    </form>
  );
};

export default UserProfile;
