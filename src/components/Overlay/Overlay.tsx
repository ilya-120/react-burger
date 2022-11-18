import Styles from "./Overlay.module.css";
import { FC } from "react";
import { TOverlayProps } from "../../utils/typeData";

const Overlay: FC<TOverlayProps> = ({ onClick }) => {
  return <div className={Styles.overlay} onClick={onClick}></div>;
};

export default Overlay;
