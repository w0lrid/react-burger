import PropTypes from "prop-types";

const TypeIngredient = PropTypes.shape({
  _id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string,
  proteins: PropTypes.number,
  fat: PropTypes.number,
  carbohydrates: PropTypes.number,
  calories: PropTypes.number,
  price: PropTypes.number,
  image: PropTypes.string.isRequired,
  image_mobile: PropTypes.string.isRequired,
  image_large: PropTypes.string.isRequired,
  __v: PropTypes.number,
})

const TypeIngredientProperty = PropTypes.shape({
  name: PropTypes.string,
  value: PropTypes.number,
})

export { TypeIngredient, TypeIngredientProperty }