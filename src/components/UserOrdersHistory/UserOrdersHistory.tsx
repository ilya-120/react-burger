import { useEffect } from "react";
import { ClipLoader } from "react-spinners";
import { useAppDispatch, useAppSelector } from "../../hooks/hook";
import { userRequest } from "../../services/actions/amplifierActions/user";
import {
  WS_USER_ORDERS_HISTORY_OPEN,
  WS_USER_ORDERS_HISTORY_CLOSE,
} from "../../services/actions/ws";

import { color } from "../../utils/data";
import { TOrderData } from "../../utils/typeData";
import OrderCardIngredients from "../OrderCardIngredients/OrderCardIngredients";
import Styles from "./UserOrdersHistory.module.css";

function UserOrdersHistory() {
  const dispatch = useAppDispatch();
  const { data, wsConnected } = useAppSelector(
    (store) => store.ordersUserHistory
  );
  useEffect(() => {
    dispatch(userRequest);
  }, [dispatch]);

  useEffect(() => {
    dispatch({ type: WS_USER_ORDERS_HISTORY_OPEN });
    return () => {
      dispatch({ type: WS_USER_ORDERS_HISTORY_CLOSE });
    };
  }, [dispatch]);

  return (
    <section className={Styles.section}>
      {!!!data.orders && (
        <span className="message">
          <ClipLoader color={color} loading={wsConnected} size={200} />
        </span>
      )}
      {data.orders && (
        <ul className={`${Styles.list} custom-scroll`}>
          {[...data.orders]?.reverse().map((order: TOrderData) => {
            return (
              <li key={order._id}>
                <OrderCardIngredients
                  number={order.number}
                  name={order.name}
                  ingredients={order.ingredients}
                  status={order.status}
                  order={order}
                />
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}

export default UserOrdersHistory;
