import styles from "./ingredient-details.module.css";
import PropTypes from "prop-types";
import { TypeIngredientProperty } from "../../utils/types";

const IngredientDetails = ({image, name, properties}) => {
  return (
    <div className={styles.ingredientDetails}>
      <h2 className={`${styles.heading} text text_type_main-large`}>Детали ингредиента</h2>
      <img src={image} alt={name} className={styles.img}/>
      <div className={styles.description}>
        <h3 className={`${styles.descriptionHeading} text text_type_main-medium`}>{name}</h3>
        <div className={styles.properties}>
          {properties.map(({name, value}, index) => (
            <div className={styles.property} key={index}>
              <h4 className={`text text_type_main-small text_color_inactive`}>{name}</h4>
              <p className={`text text_type_digits-default text_color_inactive`}>{value}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

IngredientDetails.propTypes = {
  img: PropTypes.string,
  name: PropTypes.string,
  properties: PropTypes.arrayOf(TypeIngredientProperty),
}

export default IngredientDetails;