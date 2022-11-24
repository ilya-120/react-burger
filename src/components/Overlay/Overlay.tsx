import Styles from "./Overlay.module.css";
import { FC } from "react";

type TOverlayProps = {
  onClick: () => void;
};

const Overlay: FC<TOverlayProps> = ({ onClick }) => {
  return <div className={Styles.overlay} onClick={onClick}></div>;
};

export default Overlay;
