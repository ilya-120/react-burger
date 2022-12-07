import { FC } from "react";
import { useParams } from "react-router-dom";
import { useAppSelector } from "../../hooks/hook";

import { TIngredient } from "../../utils/typeData";
import Styles from "./IngredientDetails.module.css";

const IngredientDetails: FC = () => {
  const { id } = useParams();
  const { ingredients } = useAppSelector((store) => store.ingredients);
  const ingredient = ingredients.find(
    (ingredient: TIngredient) => ingredient._id === id
  );

  return (
    <div className={`${Styles.box}`}>
      <div className={`${Styles.div1}`}>
        <img alt={ingredient!.name} src={ingredient!.image_large} />
      </div>
      <div className={`${Styles.div2}`}>
        <p className=" text_type_main-medium text mb-8">{`${
          ingredient!.name
        }`}</p>
      </div>
      <div className={`${Styles.div3}`}>
        <div className={`${Styles.div4}`}>
          <div className="text text_color_inactive text_type_main-small  mb-2">
            Калории, ккал
          </div>
          <div className="text_type_digits-default text_color_inactive">
            {`${ingredient!.calories}`}
          </div>
        </div>
        <div className={`${Styles.div4}`}>
          <div className="text text_color_inactive text_type_main-small mb-2">
            Белки, г
          </div>
          <div className="text_type_digits-default text_color_inactive">
            {`${ingredient!.proteins}`}
          </div>
        </div>
        <div className={`${Styles.div4}`}>
          <div className="text text_color_inactive text_type_main-small  mb-2">
            Жиры, г
          </div>
          <div className="text_type_digits-default text_color_inactive">
            {`${ingredient!.fat}`}
          </div>
        </div>
        <div className={`${Styles.div4}`}>
          <div className="text text_color_inactive text_type_main-small  mb-2">
            Углеводы, г
          </div>
          <div className="text_type_digits-default text_color_inactive">
            {`${ingredient!.carbohydrates}`}
          </div>
        </div>
      </div>
    </div>
  );
};

export default IngredientDetails;
