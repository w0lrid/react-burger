import { TypeIngredient } from "../../../utils/types";
import styles from "./ingredients-section.module.css"
import PropTypes from "prop-types";
import Ingredient from "../ingredient/ingredient";

const IngredientsSection = ({heading, ingredients, handleIngredientInfo}) => (
  <section className={styles.section}>
    <h3 className={`${styles.heading} text text_type_main-medium pb-6`}>{heading}</h3>
    <div className={styles.list}>
      {ingredients.map(({_id, name, image, price, calories, proteins, fat, carbohydrates}) => (
        <Ingredient
          key={_id}
          title={name}
          img={image}
          price={price}
          properties={[
            {
              name: 'Калорий, ккал',
              value: calories,
            },
            {
              name: 'Белки, г',
              value: proteins,
            },
            {
              name: 'Жиры, г',
              value: fat,
            },
            {
              name: 'Углеводы, г',
              value: carbohydrates,
            },
          ]}
          handleOpenModal={handleIngredientInfo}
        />
      ))}
    </div>
  </section>
)

IngredientsSection.propTypes = {
  heading: PropTypes.string.isRequired,
  ingredients: PropTypes.arrayOf(TypeIngredient).isRequired,
}

export default IngredientsSection;