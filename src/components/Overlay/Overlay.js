import Styles from "./Overlay.module.css";

const Overlay = ({ onClick }) => {
  return <div className={Styles.overlay} onClick={onClick}></div>;
};

export default Overlay;
