import { useSelector } from "react-redux";

const ErrorRequest = () => {
  const { errorText } = useSelector((store) => store.userData);
  return (
    <div>
      <p className="text text_type_main-large text_color_inactive pt-20 ml-10 mr-4">{errorText}</p>
      <p className="text text_type_main-medium ml-10 mr-4">Попробуйте еще раз!</p>
    </div>
  )
}

export default ErrorRequest;
