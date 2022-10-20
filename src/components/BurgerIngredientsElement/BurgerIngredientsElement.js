import {
  Counter,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import Styles from "./BurgerIngredientsElement.module.css";
import { elementsPropType } from "../utils/PropTypes";
import Modal from "../Modal/Modal";
import IngredientDetails from "../IngredientDetails/IngredientDetails";
import { useDispatch, useSelector } from "react-redux";
import { CLOSE_SHOW_MODAL, OPEN_SHOW_MODAL } from "../../services/actions";
import { useDrag } from "react-dnd";

const BurgerIngredientsElement = ({ ingredient }) => {
  const dispatch = useDispatch();
  const {
    constructorBuns,
    constructorIngredients,
    showModal,
    modalIngredientsDetails,
  } = useSelector((store) => store.ingredients);

  const [, dragRef, dragPreviewRef] = useDrag({
    type: "ingredient",
    item: ingredient,
    collect: (monitor) => ({
      opacity: monitor.isDragging() ? 0.5 : 1,
    }),
  });

  function handleshowModal() {
    dispatch({
      type: OPEN_SHOW_MODAL,
      payload: ingredient,
    });
  }

  function handleCloseModal() {
    dispatch({
      type: CLOSE_SHOW_MODAL,
    });
  }

  const showCountMaterials = () => {
    if (ingredient.name === constructorBuns.name) return 1;
    const id = constructorIngredients.filter(
      (item) => item.name === ingredient.name
    );
    return id.length;
  };

  return (
    <li className={`${Styles.element} mb-8`} ref={dragRef}>
      <div onClick={handleshowModal}>
        {showCountMaterials() >= 1 ? (
          <Counter size="default" count={showCountMaterials()} />
        ) : (
          ""
        )}
        <img
          className="ml-4 mr-4 mb-1"
          src={ingredient.image}
          alt={ingredient.name}
          ref={dragPreviewRef}
        />
        <div className={`${Styles.currency} mb-1`}>
          <span className="text text_type_digits-default">
            {ingredient.price}
          </span>
          &nbsp;
          <CurrencyIcon />
        </div>
        <span className="text text_type_main-small">{ingredient.name}</span>
      </div>
      {showModal && ingredient._id === modalIngredientsDetails._id && (
        <Modal title="Детали ингредиента" onClose={handleCloseModal}>
          <IngredientDetails ingredient={ingredient} />
        </Modal>
      )}
    </li>
  );
};

BurgerIngredientsElement.propTypes = {
  ingredient: elementsPropType.isRequired,
};

export default BurgerIngredientsElement;
