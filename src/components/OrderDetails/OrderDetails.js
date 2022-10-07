import Style from "./OrderDetails.module.css";

function OrderDetails({ number, message, link }) {
  return (
    <div className={`${Style["order-box"]}`}>
      <div className="mt-15">
        <p className="text text_type_digits-large">{number}</p>
      </div>
      <div className="text text_type_main-default mb-15">{message[0]}</div>
      <div className={`${Style.div}`}>
        <img alt="фото" src={link} />
      </div>
      <div className="text text_type_main-default mb-2">{message[1]}</div>
      <div className="text text_type_main-default text_color_inactive mb-30">
        {message[2]}
      </div>
    </div>
  );
}

export default OrderDetails;
