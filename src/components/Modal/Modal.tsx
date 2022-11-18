import { KeyboardEvent, useEffect } from "react";
import ReactDom from "react-dom";
import Styles from "./Modal.module.css";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import Overlay from "../Overlay/Overlay";
import { FC } from "react";
import { TModalProps } from "../../utils/typeData";

const Modal: FC<TModalProps> = ({ title, onClose, children }) => {
  const portal: HTMLElement = document.getElementById("root") as HTMLElement;

  useEffect(() => {
    if (!onClose) return;
    const closeByEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    document.addEventListener("keydown", closeByEscape as any);
    return () => document.removeEventListener("keydown", closeByEscape as any);
  }, [onClose]);

  return ReactDom.createPortal(
    <div className={Styles.modal}>
      <Overlay onClick={onClose} />
      <div className={Styles.modal__box}>
        <div className={`${Styles.modal__header} text`}>
          <h4 className="text text_type_main-large">{title}</h4>
          <CloseIcon type="primary" onClick={onClose}></CloseIcon>
        </div>
        <div className={Styles.modal__content}>{children}</div>
      </div>
    </div>,
    portal
  );
};

export default Modal;
