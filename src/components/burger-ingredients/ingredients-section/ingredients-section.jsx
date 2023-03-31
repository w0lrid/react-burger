import Ingredient from "../ingredient/ingredient";
import styles from "./ingredients-section.module.css"
import PropTypes from "prop-types";

const IngredientsSection = ({heading, ingredients}) => {
  return (
    <section className={styles.section}>
      <h3 className={`${styles.heading} text text_type_main-medium pb-6`}>{heading}</h3>
      <div className={styles.list}>
        {ingredients.map(({_id, name, image, price}) => (
          <Ingredient
            key={_id}
            title={name}
            img={image}
            price={price}
          />
        ))}
      </div>
    </section>
  )
}

IngredientsSection.propTypes = {
  heading: PropTypes.string.isRequired,
  ingredients: PropTypes.arrayOf(PropTypes.shape({
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
  })).isRequired,
}

export default IngredientsSection;