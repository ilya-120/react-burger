import Style from "./OrderDetails.module.css";
import done from "../../images/done.svg";
import { color } from "../utils/data";
import { useContext } from "react";
import { OrderNumberContext } from "../utils/appContext";
import { ClipLoader } from "react-spinners";

function OrderDetails() {
  const { orderNumber, orderError } = useContext(OrderNumberContext);
  return (
    <div className={`${Style["order-box"]}`}>
      <div className="mt-15">
        <p className="text text_type_digits-large">
          {!orderNumber && !orderError ? (
            <ClipLoader
              color={color}
              loading={!orderNumber || !orderError}
              size={50}
            />
          ) : (
            orderNumber || `error: ${orderError}`
          )}
        </p>
      </div>
      <div className="text text_type_main-default mb-15">
        {!orderError ? "идентификатор заказа" : ""}
      </div>
      <div className={`${Style.div}`}>
        {!orderError ? <img alt="фото" src={done} /> : ""}
      </div>
      <div className="text text_type_main-default mb-2">
        {!orderError ? "Ваш заказ начали готовить" : "Произошла ошибка"}
      </div>
      <div className="text text_type_main-default text_color_inactive mb-30">
        {!orderError
          ? "Дождитесь готовности на орбитальной станции"
          : "Попробуйте еще раз"}
      </div>
    </div>
  );
}

export default OrderDetails;
