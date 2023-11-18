import styles from './ingredient-details.module.css';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

const IngredientDetails = () => {
  const { ingredients } = useSelector((state) => state.ingredients);
  const { ingredientId } = useParams();
  const ingredient = ingredients.find((ingredient) => ingredient._id === ingredientId);
  const { image, name, calories, proteins, fat, carbohydrates } = ingredient;
  const ingredientProperties = [
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
  ];

  return (
    <div className={styles.ingredientDetails}>
      {ingredient && (
        <>
          <h2 className={`${styles.heading} ${ingredient && styles.center} text text_type_main-large`}>
            Детали ингредиента
          </h2>
          <img src={image || ingredient.image} alt={name} className={styles.img} />
          <div className={styles.description}>
            <h3 className={`${styles.descriptionHeading} text text_type_main-medium`}>{name || ingredient.name}</h3>
            <div className={styles.properties}>
              {ingredientProperties.map(({ name, value }, index) => (
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
  );
};

export default IngredientDetails;
