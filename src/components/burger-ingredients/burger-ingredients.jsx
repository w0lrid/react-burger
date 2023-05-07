import { useState, useMemo } from "react";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burger-ingredients.module.css";
import IngredientsSection from "./ingredients-section/ingredients-section";
import PropTypes from "prop-types";
import { TypeIngredient } from "../../utils/types";
import { useSelector } from "react-redux";

const BurgerIngredients = () => {
  const {ingredients} = useSelector(store => store.ingredients)
  const [current, setCurrent] = useState('Булки')
  const buns = useMemo(() => ingredients.filter(({type}) => type === 'bun'), [ingredients])
  const filling = useMemo(() => ingredients.filter(({type}) => type === 'main'), [ingredients])
  const sauces = useMemo(() => ingredients.filter(({type}) => type === 'sauce'), [ingredients])

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
          ingredients={buns} />
        <IngredientsSection
          heading="Соусы"
          ingredients={sauces} />
        <IngredientsSection
          heading="Начинки"
          ingredients={filling} />
      </div>
    </div>
  )
}

export default BurgerIngredients
