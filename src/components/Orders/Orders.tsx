import { FC } from "react";
import Styles from "./Orders.module.css";
import { TWSData } from "../../utils/typeData";
import { constants } from "../../utils/data";
import { getOrderNumbers } from "../../hooks/ordersFunctions";

type TOrders = {
  data: TWSData;
};

const Orders: FC<TOrders> = ({ data }) => {
  const { orders } = data;
  const { done, pending } = getOrderNumbers(orders);

  return (
    <section className={Styles.section}>
      <div className={Styles.container}>
        <div className="mr-9">
          <h3 className="text text_type_main-medium mb-6">
            {constants.orders.ready}
          </h3>
          <ul className={Styles.list}>
            {done.map((item: number, index: number) => {
              return (
                <li
                  key={index}
                  className={`text text_type_digits-default ${Styles.listItem}`}
                >
                  {item}
                </li>
              );
            })}
          </ul>
        </div>
        <div>
          <h3 className="text text_type_main-medium mb-6">
            {constants.orders.preparing}
          </h3>
          <ul className={Styles.list}>
            {pending.map((item: number, index: number) => {
              return (
                <li key={index} className={`text text_type_digits-default`}>
                  {item}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      <div className="mt-15 mb-15">
        <h3 className="text text_type_main-medium">
          {constants.orders.all_time}
        </h3>
        <span className={`text text_type_digits-large ${Styles.numberOrder}`}>
          {data.total}
        </span>
      </div>
      <div>
        <h3 className="text text_type_main-medium">
          {constants.orders.day_today}
        </h3>
        <span className={`text text_type_digits-large ${Styles.numberOrder}`}>
          {data.totalToday}
        </span>
      </div>
    </section>
  );
};

export default Orders;
