import styles from './ingredients-section.module.css';
import Ingredient from '../ingredient/ingredient';
import { TIngredient } from '../../../types/types';
import { FC } from 'react';

type TIngredientsSection = {
  heading: string;
  ingredients: TIngredient[];
  type: string;
};

const IngredientsSection: FC<TIngredientsSection> = ({ heading, ingredients, type }) => (
  <section className={styles.section} data-section id={type}>
    <h3 className={`${styles.heading} text text_type_main-medium pb-6`}>{heading}</h3>
    <div className={styles.list}>
      {ingredients.map((ingredient) => (
        <Ingredient key={ingredient._id} ingredient={ingredient} />
      ))}
    </div>
  </section>
);

export default IngredientsSection;
