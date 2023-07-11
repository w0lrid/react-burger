import { useState, useMemo, useRef, useEffect } from "react";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burger-ingredients.module.css";
import IngredientsSection from "./ingredients-section/ingredients-section";
import { useSelector } from "react-redux";

const BurgerIngredients = () => {
  const {ingredients} = useSelector(store => store.ingredients)
  const [current, setCurrent] = useState('buns')
  const buns = useMemo(() => ingredients.filter(({type}) => type === 'bun'), [ingredients])
  const filling = useMemo(() => ingredients.filter(({type}) => type === 'main'), [ingredients])
  const sauces = useMemo(() => ingredients.filter(({type}) => type === 'sauce'), [ingredients])
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
