import Ingredient from "../ingredient/ingredient";
import "./ingredients-section.css"

const IngredientsSection = ({ heading, ingredients }) => {
  return (
    <section className="ingredients__section">
      <h3 className="ingredients__heading text text_type_main-medium pb-6">{heading}</h3>
      <div className="ingredients__list">
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