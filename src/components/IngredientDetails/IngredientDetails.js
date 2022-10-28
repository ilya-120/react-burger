import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Style from "./IngredientDetails.module.css";

function IngredientDetails() {
  const { id } = useParams();
  const { ingredients } = useSelector((store) => store.ingredients);
  const ingredient = ingredients.find((ingredient) => ingredient._id === id);

  return (
    <div className={`${Style.box}`}>
      <div className={`${Style.div1}`}>
        <img alt={ingredient.name} src={ingredient.image_large} />
      </div>
      <div className={`${Style.div2}`}>
        <p className=" text_type_main-medium text">{`${ingredient.name}`}</p>
      </div>
      <div className={`${Style.div3}`}>
        <div className={`${Style.div4}`}>
          <div className="text text_color_inactive text_type_main-small  mb-2">
            Калории, ккал
          </div>
          <div className="text_type_digits-default text_color_inactive">
            {`${ingredient.calories}`}
          </div>
        </div>
        <div className={`${Style.div4}`}>
          <div className="text text_color_inactive text_type_main-small mb-2">
            Белки, г
          </div>
          <div className="text_type_digits-default text_color_inactive">
            {`${ingredient.proteins}`}
          </div>
        </div>
        <div className={`${Style.div4}`}>
          <div className="text text_color_inactive text_type_main-small  mb-2">
            Жиры, г
          </div>
          <div className="text_type_digits-default text_color_inactive">
            {`${ingredient.fat}`}
          </div>
        </div>
        <div className={`${Style.div4}`}>
          <div className="text text_color_inactive text_type_main-small  mb-2">
            Углеводы, г
          </div>
          <div className="text_type_digits-default text_color_inactive">
            {`${ingredient.carbohydrates}`}
          </div>
        </div>
      </div>
    </div>
  );
}

export default IngredientDetails;
