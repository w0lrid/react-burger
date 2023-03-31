import Ingredient from "../ingredient/ingredient";
import styles from "./ingredients-section.module.css"

const IngredientsSection = ({ heading, ingredients }) => {
  return (
    <section className={styles.section}>
      <h3 className={`${styles.heading} text text_type_main-medium pb-6`}>{heading}</h3>
      <div className={styles.list}>
        {ingredients.map(({ _id, name, image, price}) => (
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

export default IngredientsSection;