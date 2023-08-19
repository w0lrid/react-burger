import { useState, useMemo, useRef, useEffect } from "react";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burger-ingredients.module.css";
import IngredientsSection from "./ingredients-section/ingredients-section";
import { useSelector } from "react-redux";
import { getIngredientsFromStore, getOrderFromStore } from "../../services/selectors/order";

const BurgerIngredients = () => {
  const {ingredients} = useSelector(getIngredientsFromStore)
  const {ingredients: orderIngredients} = useSelector(getOrderFromStore)
  const [current, setCurrent] = useState('buns')
  const buns = useMemo(() => {
    const buns = filterIngredientsByType('bun');
    addCountToIngredient(buns);
    return buns;
  }, [ingredients, orderIngredients])
  const filling = useMemo(() => {
    const fillings = filterIngredientsByType('main')
    addCountToIngredient(fillings);
    return fillings;
  }, [ingredients, orderIngredients])
  const sauces = useMemo(() => {
    const sauces = filterIngredientsByType('sauce');
    addCountToIngredient(sauces);
    return sauces
  }, [ingredients, orderIngredients])
  const observer = useRef(null)

  useEffect(() => {
    observer.current = new IntersectionObserver(entries => {
      const visibleSection = entries.find(entry => entry.isIntersecting)?.target;

      if (visibleSection) {
        setCurrent(visibleSection.id);
      }
    });

    const sections = document.querySelectorAll('[data-section]');

    sections.forEach((section) => {
      observer.current.observe(section);
    });

    return () => {
      sections.forEach((section) => {
        observer.current.unobserve(section);
      });
    };
  }, []);

  function addCountToIngredient (ingredients) {
    ingredients.forEach(sauce => {
      sauce.count = orderIngredients.filter(orderIngredient => sauce._id === orderIngredient._id).length
    });
  }

  function filterIngredientsByType (incomingType) {
    return ingredients.filter(({type}) => type === incomingType)
  }

  return (
    <div className={styles.ingredients}>
      <nav className={styles.nav}>
        <Tab active={current === 'buns'} value="Булки" onClick={setCurrent}>Булки</Tab>
        <Tab active={current === 'sauces'} value="Соусы" onClick={setCurrent}>Соусы</Tab>
        <Tab active={current === 'main'} value="Начинки" onClick={setCurrent}>Начинки</Tab>
      </nav>
      <div className={styles.sections}>
        <IngredientsSection
          heading="Булки"
          ingredients={buns}
          type='buns' />
        <IngredientsSection
          heading="Соусы"
          ingredients={sauces}
          type='sauces' />
        <IngredientsSection
          heading="Начинки"
          ingredients={filling}
          type='main' />
      </div>
    </div>
  )
}

export default BurgerIngredients
