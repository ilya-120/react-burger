import Style from "./OrderDetails.module.css";
import done from "../../images/done.svg";
import { data } from "../utils/data";

function OrderDetails() {
  return (
    <div className={`${Style["order-box"]}`}>
      <div className="mt-15">
        <p className="text text_type_digits-large">{data.number}</p>
      </div>
      <div className="text text_type_main-default mb-15">{data.message[0]}</div>
      <div className={`${Style.div}`}>
        <img alt="фото" src={done} />
      </div>
      <div className="text text_type_main-default mb-2">{data.message[1]}</div>
      <div className="text text_type_main-default text_color_inactive mb-30">
        {data.message[2]}
      </div>
    </div>
  );
}

export default OrderDetails;
