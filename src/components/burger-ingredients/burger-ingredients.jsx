import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burger-ingredients.module.css";
// import data from "../data";
import IngredientsSection from "./ingredients-section/ingredients-section";
import { useState } from "react";

const BurgerIngredients = ({data}) => {
  const [current, setCurrent] = useState('Булки')

  const buns = data.filter(({type}) => type === 'bun')
  const filling = data.filter(({type}) => type === 'main')
  const sauces = data.filter(({type}) => type === 'sauce')

  return (
    <div className={styles.ingredients}>
      <nav className={styles.nav}>
        <Tab active={current === 'Булки'} value="Булки" onClick={setCurrent}>Булки</Tab>
        <Tab active={current === 'Соусы'} value="Соусы" onClick={setCurrent}>Соусы</Tab>
        <Tab active={current === 'Начинки'} value="Начинки" onClick={setCurrent}>Начинки</Tab>
      </nav>
      <div className={styles.sections}>
        <IngredientsSection
          heading="Булки"
          ingredients={buns}
        />
        <IngredientsSection
          heading="Соусы"
          ingredients={sauces}
        />
        <IngredientsSection
          heading="Начинки"
          ingredients={filling}
        />
      </div>
    </div>
  )
}

export default BurgerIngredients