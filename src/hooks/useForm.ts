import { SyntheticEvent, useState } from "react";
import { TUserDataForm } from "../utils/typeData";

export function useForm(inputValues: TUserDataForm) {
  const [form, setForm] = useState(inputValues);

  const onChange = (e: SyntheticEvent) => {
    let target = e.target as HTMLInputElement;
    setForm({ ...form, [target.name]: target.value });
  };
  return { form, onChange, setForm };
}
