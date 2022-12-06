import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { FC } from "react";
import Styles from "./OrderPrice.module.css";

type TPrice = {
  price: string | number | null;
};

const OrderPrice: FC<TPrice> = ({ price }) => {
  return (
    <div className={Styles.div}>
      <span className='text text_type_digits-default mr-2'>{price}</span>
      <CurrencyIcon type='primary' />
    </div>
  );
};

export default OrderPrice;
