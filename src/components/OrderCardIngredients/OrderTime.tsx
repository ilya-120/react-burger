import { FC } from "react";

type TOrderTime = {
  time: string | undefined;
};

const OrderTime: FC<TOrderTime> = ({ time }) => {
  return (
    <span className='text text_type_main-default text_color_inactive'>
      {time}
    </span>
  );
};

export default OrderTime;
