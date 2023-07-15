import { Counter, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./ingredient.module.css";
import PropTypes from "prop-types";
import { TypeIngredientProperty } from "../../../utils/types";
import { useDispatch, useSelector } from "react-redux";
import { showIngredient } from "../../../services/actions/ingredient";
import { useDrag } from "react-dnd";
import { useEffect, useState } from "react";

const Ingredient = ({ingredient, properties}) => {
  const { image, price, name, type } = ingredient
  const {ingredients: orderIngredients} = useSelector(store => store.order)
  const [count, setCount] = useState(0)
  const dispatch = useDispatch();
  const [{isDrag}, dragRef] = useDrag({
    type: type === 'bun' ? 'bun' : 'ingredient',
    item: ingredient,
    collect: monitor => ({
      isDrag: monitor.isDragging()
    })
  })

  useEffect(() => {
    const ingredientsCount = orderIngredients.filter(orderIngredient => ingredient._id === orderIngredient._id)
    setCount(ingredientsCount.length)
  }, [orderIngredients])

  return (
    <div
      className={`${styles.ingredientCard} ${isDrag ? styles.ingredientCardDragging : ''}`}
      onClick={() => dispatch(showIngredient({image, name, properties}))}
      ref={dragRef}
    >
      {count > 0 && <Counter count={count} extraClass={styles.cardCounter}/>}
      <img src={image} alt={name} className="img"/>
      <p className="text text_type_main-medium">{price} <CurrencyIcon type="primary"/></p>
      <p className="text text_type_main-default">{name}</p>
    </div>
  )
}

Ingredient.propTypes = {
  img: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  properties: PropTypes.arrayOf(TypeIngredientProperty).isRequired,
  handleOpenModal: PropTypes.func,
}

export default Ingredient;