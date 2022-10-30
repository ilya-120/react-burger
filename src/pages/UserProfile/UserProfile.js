import { useEffect, useState } from "react";
import {
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import Styles from "./UserProfile.module.css";
import { useSelector } from "react-redux";
import { userRequest } from "../../services/actions/amplifierActions/user";
import { ClipLoader } from "react-spinners";
import { color } from "../../utils/data";

const UserProfile = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const { userInfo, isLoading } = useSelector((store) => store.userData);
  useEffect(() => {
    setForm({ password: '', ...userInfo.user })
    userRequest()
  }, [userInfo])

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const onChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    isLoading ? (<span className="message">
      <ClipLoader color={color} loading={isLoading} size={200} />
    </span>) :
      (
        <form onSubmit={handleSubmit} className={Styles.container}>
          <Input
            type={"text"}
            placeholder={"Имя"}
            onChange={onChange}
            value={form.name || ''}
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
            value={form.email || ''}
            name={"email"}
            errorText={"Ошибка"}
            error={false}
            onChange={onChange}
            size={"default"}
            icon={"EditIcon"}
          />
          <span className="pb-6"></span>
          <PasswordInput
            value={form.password || ''}
            name={"password"}
            onChange={onChange}
            icon={"EditIcon"}
          />
        </form>)
  );
};

export default UserProfile;
