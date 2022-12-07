import { FC, useEffect } from "react";
import OrderIngredients from "../../components/OrderIngredients/OrderIngredients";
import Orders from "../../components/Orders/Orders";
import { useAppDispatch, useAppSelector } from "../../hooks/hook";
import {
  WS_ORDERS_HISTORY_CLOSE,
  WS_ORDERS_HISTORY_OPEN,
} from "../../services/actions/ws";

import Styles from "./Feed.module.css";

const Feed: FC = () => {
  const dispatch = useAppDispatch();
  const { data } = useAppSelector(store => store.ordersHistory);

  useEffect(() => {
    dispatch({ type: WS_ORDERS_HISTORY_OPEN });
    return () => {
      dispatch({ type: WS_ORDERS_HISTORY_CLOSE });
    };
  }, [dispatch]);

  return (
    <main className={Styles.main}>
      <OrderIngredients orders={data.orders} />
      <Orders data={data} />
    </main>
  );
}

export default Feed;
