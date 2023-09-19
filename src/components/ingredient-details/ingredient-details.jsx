import styles from "./ingredient-details.module.css";
import PropTypes from "prop-types";
import { TypeIngredientProperty } from "../../utils/types";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

const IngredientDetails = ({image, name, properties}) => {
  const {ingredients} = useSelector(state => state.ingredients)
  const location = useLocation()
  const isExactIngredient = location.pathname.includes('ingredients')
  const ingredientId = location.pathname.split('/').slice(-1)[0]
  const [ingredient, setIngredient] = useState(null)

  useEffect(() => {
    if (!name && isExactIngredient && ingredients.length > 0) {
      ingredients.forEach(ingredient => {
        if (ingredientId === ingredient._id) {
          setIngredient({
            image: ingredient.image,
            name: ingredient.name,
            properties: [
              {
                name: 'Калорий, ккал',
                value: ingredient.calories,
              },
              {
                name: 'Белки, г',
                  value: ingredient.proteins,
              },
              {
                name: 'Жиры, г',
                  value: ingredient.fat,
              },
              {
                name: 'Углеводы, г',
                  value: ingredient.carbohydrates,
              },
            ],
          })
        }
      })
    }
  }, [ingredients])

  return (
    <div className={styles.ingredientDetails}>
    {(ingredient || name) && (
      <>
        <h2 className={`${styles.heading} ${ingredient && styles.center} text text_type_main-large`}>Детали ингредиента</h2>
        <img src={image || ingredient.image} alt={name} className={styles.img}/>
        <div className={styles.description}>
          <h3 className={`${styles.descriptionHeading} text text_type_main-medium`}>{name || ingredient.name}</h3>
          <div className={styles.properties}>
            {ingredient && ingredient.properties.map(({name, value}, index) => (
              <div className={styles.property} key={index}>
                <h4 className={`text text_type_main-small text_color_inactive`}>{name}</h4>
                <p className={`text text_type_digits-default text_color_inactive`}>{value}</p>
              </div>
            ))}
            {properties && properties.map(({name, value}, index) => (
              <div className={styles.property} key={index}>
                <h4 className={`text text_type_main-small text_color_inactive`}>{name}</h4>
                <p className={`text text_type_digits-default text_color_inactive`}>{value}</p>
              </div>
            ))}
          </div>
        </div>
      </>
    )}
    </div>
  )
}

IngredientDetails.propTypes = {
  img: PropTypes.string,
  name: PropTypes.string,
  properties: PropTypes.arrayOf(TypeIngredientProperty),
}

export default IngredientDetails;