import styles from "./ingredient-details.module.css";

const IngredientDetails = ({img, name, properties}) => {
  return (
    <div className={styles.ingredientDetails}>
      <h2 className={`${styles.heading} text text_type_main-large`}>Детали ингредиента</h2>
      <img src={img} alt={name} className={styles.img}/>
      <div className={styles.description}>
        <h3 className={`${styles.descriptionHeading} text text_type_main-medium`}>{name}</h3>
        <div className={styles.properties}>
          {properties.map(({name, value}) => (
            <div className={styles.property}>
              <h4 className={`text text_type_main-small text_color_inactive`}>{name}</h4>
              <p className={`text text_type_digits-default text_color_inactive`}>{value}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default IngredientDetails;