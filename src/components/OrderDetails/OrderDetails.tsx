import Styles from "./OrderDetails.module.css";
import done from "../../images/done.svg";
import { color } from "../../utils/data";
import { ClipLoader } from "react-spinners";
import { FC } from "react";
import { useAppSelector } from "../../hooks/hook";

const OrderDetails: FC = () => {
  const { error, errorText, orderNumber } = useAppSelector(
    (store) => store.orderNumber
  );
  return (
    <div className={`${Styles["order-box"]}`}>
      <div className="mt-15">
        <p data-testid="order_number" className="text text_type_digits-large">
          {!orderNumber && !error ? (
            <ClipLoader
              color={color}
              loading={!orderNumber || !error}
              size={50}
            />
          ) : (
            orderNumber || ""
          )}
        </p>
      </div>
      <div className="text text_type_main-default mb-15">
        {!error ? "идентификатор заказа" : `error: ${errorText}`}
      </div>
      <div className={`${Styles.div}`}>
        {!error ? <img alt="фото" src={done} /> : ""}
      </div>
      <div className="text text_type_main-default mb-2">
        {!error ? "Ваш заказ начали готовить" : "Произошла ошибка"}
      </div>
      <div className="text text_type_main-default text_color_inactive mb-30">
        {!error
          ? "Дождитесь готовности на орбитальной станции"
          : "Попробуйте еще раз"}
      </div>
    </div>
  );
};

export default OrderDetails;
