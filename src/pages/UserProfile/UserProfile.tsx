import {
  FC,
  FormEvent,
  SyntheticEvent,
  useCallback,
  useEffect,
  useState,
} from "react";
import {
  Button,
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import Styles from "./UserProfile.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  udateUserRequest,
  userRequest,
} from "../../services/actions/amplifierActions/user";
import { ClipLoader } from "react-spinners";
import { color } from "../../utils/data";
import Modal from "../../components/Modal/Modal";
import ErrorRequest from "../../components/ErrorRequest/ErrorRequest";
import {
  ERROR_TEXT_PATCH_UPDATE_USER,
  IS_LOADING,
  RESET_ERROR,
} from "../../services/actions/user";
import { RootState } from "../../services/reducers";

const UserProfile: FC = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [disabled, setDisabled] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();
  const { userInfo, isLoading, errorText } = useSelector(
    (store: RootState) => store.userData
  );

  useEffect(() => {
    dispatch((userRequest as any)(reflectErrorRequest));
  }, [dispatch]);

  useEffect(() => {
    setForm({ password: "", ...userInfo!.user as any });
  }, [userInfo]);

  useEffect(() => {
    if (
      userInfo!.user!.name === form.name &&
      userInfo!.user!.email === form.email &&
      !form.password
    ) {
      setDisabled(true);
    }
  }, [form, userInfo]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    dispatch({
      type: IS_LOADING,
    });
    form
      ? dispatch((udateUserRequest as any)(form, reflectErrorRequest))
      : dispatch({
          type: ERROR_TEXT_PATCH_UPDATE_USER,
          payload: "Проверьте корректность данных!",
        });
    setShowModal(true);
  };

  const onChange = (e: SyntheticEvent) => {
    let target = e.target as HTMLInputElement;
    setForm({ ...form, [target.name]: target.value });
    setDisabled(false);
  };

  const onCancel = useCallback(() => {
    setForm({ ...userInfo!.user as any });
    setDisabled(true);
  }, [userInfo]);

  const reflectErrorRequest = () => {
    setShowModal(true);
  };

  return isLoading ? (
    <span className="message">
      <ClipLoader color={color} loading={isLoading} size={200} />
    </span>
  ) : (
    <form onSubmit={handleSubmit} className={Styles.container}>
      <Input
        type={"text"}
        placeholder={"Имя"}
        onChange={onChange}
        value={form.name || ""}
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
        value={form.email || ""}
        name={"email"}
        errorText={"Ошибка"}
        error={false}
        onChange={onChange}
        size={"default"}
        icon={"EditIcon"}
      />
      <span className="pb-6"></span>
      <PasswordInput
        value={form.password || ""}
        name={"password"}
        onChange={onChange}
        icon={"EditIcon"}
      />
      {!disabled ? (
        <div className={`${Styles.div} mt-6`}>
          <Button htmlType="submit" type="secondary" onClick={onCancel}>
            Отменить
          </Button>
          <Button htmlType="submit" disabled={disabled} type="primary">
            Сохранить
          </Button>
        </div>
      ) : (
        ""
      )}
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

export default UserProfile;
