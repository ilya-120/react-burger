import { useEffect } from "react";
import ReactDom from "react-dom";
import Styles from "./Modal.module.css";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import Overlay from "../Overlay/Overlay";

const Modal = ({ isOpen, title, onClose, children }) => {
  const portal = document.getElementById("root");

  useEffect(() => {
    if (!isOpen) return;
    const closeByEscape = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    document.addEventListener("keydown", closeByEscape);
    return () => document.removeEventListener("keydown", closeByEscape);
  }, [isOpen, onClose]);

  const handleOverlay = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return ReactDom.createPortal(
    <div className={Styles.modal}>
      <Overlay onClick={handleOverlay} />
      <div className={Styles.modal__box}>
        <div className={`${Styles.modal__header} text`}>
          <h4 className="text text_type_main-large"> {title}</h4>
          <CloseIcon type="button" onClick={onClose}></CloseIcon>
        </div>
        <div className={Styles.modal__content}>{children}</div>
      </div>
    </div>,
    portal
  );
};

export default Modal;
