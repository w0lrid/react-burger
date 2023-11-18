import { TypeIngredient } from '../../../utils/types';
import styles from './ingredients-section.module.css';
import PropTypes from 'prop-types';
import Ingredient from '../ingredient/ingredient';

const IngredientsSection = ({ heading, ingredients, type }) => (
  <section className={styles.section} data-section id={type}>
    <h3 className={`${styles.heading} text text_type_main-medium pb-6`}>{heading}</h3>
    <div className={styles.list}>
      {ingredients.map((ingredient) => (
        <Ingredient
          key={ingredient._id}
          ingredient={ingredient}
          properties={[
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
          ]}
        />
      ))}
    </div>
  </section>
);

IngredientsSection.propTypes = {
  heading: PropTypes.string.isRequired,
  ingredients: PropTypes.arrayOf(TypeIngredient).isRequired,
  type: PropTypes.string.isRequired,
};

export default IngredientsSection;
