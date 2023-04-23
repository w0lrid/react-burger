import { useState, useContext } from "react";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burger-ingredients.module.css";
import IngredientsSection from "./ingredients-section/ingredients-section";
import PropTypes from "prop-types";
import { TypeIngredient } from "../../utils/types";
import { IngredientsContext } from "../../services/burgerContext";

const BurgerIngredients = ({ handleIngredientInfo }) => {
  const {ingredients} = useContext(IngredientsContext)
  const [current, setCurrent] = useState('Булки')

  const buns = ingredients.filter(({type}) => type === 'bun')
  const filling = ingredients.filter(({type}) => type === 'main')
  const sauces = ingredients.filter(({type}) => type === 'sauce')

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
          handleIngredientInfo={handleIngredientInfo}
        />
        <IngredientsSection
          heading="Соусы"
          ingredients={sauces}
          handleIngredientInfo={handleIngredientInfo}
        />
        <IngredientsSection
          heading="Начинки"
          ingredients={filling}
          handleIngredientInfo={handleIngredientInfo}
        />
      </div>
    </div>
  )
}

BurgerIngredients.propTypes = {
  data: PropTypes.arrayOf(TypeIngredient).isRequired,
  handleIngredientInfo: PropTypes.func,
}

export default BurgerIngredients
