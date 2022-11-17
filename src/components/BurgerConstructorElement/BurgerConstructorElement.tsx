import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import Styles from "./BurgerConstructorElement.module.css";
import { useRef } from "react";
import { DropTargetMonitor, useDrag, useDrop, XYCoord } from "react-dnd";
import { useDispatch } from "react-redux";
import { REMOVE_ELEMENT } from "../../services/actions/constructor";
import { FC } from "react";
import {
  TBurgerConstructorElementProps,
  TIngredient,
} from "../../utils/typeData";

const BurgerConstructorElement: FC<
  TBurgerConstructorElementProps<TIngredient>
> = ({ element, index, moveIngredient }) => {
  const ref = useRef<HTMLLIElement>(null);
  const dispatch = useDispatch();
  const [handlerId, dropTarget] = useDrop<any>({
    accept: "ingredients",
    collect: (monitor) => ({
      handlerId: monitor.getHandlerId(),
    }),
    hover(ingredient, monitor: DropTargetMonitor) {
      if (!ref.current) {
        return;
      }
      const dIndex = element.index;

      if (dIndex === index) {
        return;
      }
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

      const clientOffset = monitor.getClientOffset();
      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;
      if (dIndex < index && hoverClientY < hoverMiddleY) {
        return;
      }
      moveIngredient(ingredient, index);
      ingredient.index = index;
    },
  });

  const [, drag] = useDrag({
    type: "ingredients",
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  drag(dropTarget(ref));

  return (
    <li
      ref={ref}
      data-handler-id={handlerId}
      onDrop={(e) => e.preventDefault()}
      className={`${Styles["list-element"]}`}
    >
      <DragIcon type="primary" />
      <div className={`${Styles.div} ml-2 mr-2`}>
        <ConstructorElement
          text={element.name}
          price={element.price}
          thumbnail={element.image}
          handleClose={() => {
            dispatch({
              type: REMOVE_ELEMENT,
              payload: element._id,
            });
          }}
        />
      </div>
    </li>
  );
};

export default BurgerConstructorElement;
