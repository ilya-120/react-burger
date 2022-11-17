import { FC } from "react";
import { useSelector } from "react-redux";
import { AnyAction } from "redux";

const ErrorRequest: FC = () => {
  const { errorText } = useSelector((store: AnyAction) => store.userData);
  return (
    <div>
      <p className="text text_type_main-large text_color_inactive pt-20 ml-10 mr-4">{errorText}</p>
      <p className="text text_type_main-medium ml-10 mr-4">Попробуйте еще раз!</p>
    </div>
  )
}

export default ErrorRequest;
