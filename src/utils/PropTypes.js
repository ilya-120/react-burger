import PropTypes from "prop-types";

export const elementsPropType = PropTypes.shape({
  calories: PropTypes.number,
  carbohydrates: PropTypes.number,
  fat: PropTypes.number,
  image: PropTypes.string.isRequired,
  image_large: PropTypes.string,
  image_mobile: PropTypes.string,
  name: PropTypes.string.isRequired,
  price: PropTypes.number,
  proteins: PropTypes.number,
  type: PropTypes.oneOf(["bun", "main", "sauce"]).isRequired,
  __v: PropTypes.number,
  _id: PropTypes.string.isRequired,
  id: PropTypes.string,
});
