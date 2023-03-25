import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import "./ingredient.css";

const Ingredient = ({ img, price, title}) => {
  return (
    <div className="ingredient-card">
      <img src={img} alt="Картинка булочки" className="img"/>
      <p className="price text text_type_main-medium">{price} <CurrencyIcon type="primary" /></p>
      <p className="title text text_type_main-default">{title}</p>
    </div>
  )
}

export default Ingredient;