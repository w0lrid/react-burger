import { Counter, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./ingredient.module.css";
import PropTypes from "prop-types";
import { TypeIngredientProperty } from "../../../utils/types";

const Ingredient = ({img, price, title, properties, handleOpenModal}) => (
  <>
    <div className={styles.ingredientCard} onClick={() => handleOpenModal({img, title, properties})}>
      <Counter count={1} extraClass={styles.cardCounter}/>
      <img src={img} alt={title} className="img"/>
      <p className="text text_type_main-medium">{price} <CurrencyIcon type="primary"/></p>
      <p className="text text_type_main-default">{title}</p>
    </div>
  </>
)

Ingredient.propTypes = {
  img: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  properties: PropTypes.arrayOf(TypeIngredientProperty).isRequired,
  handleOpenModal: PropTypes.func,
}

export default Ingredient;