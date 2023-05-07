import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { getIngredients } from "../../services/actions/ingredients";
import styles from './app.module.css';
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import Modal from "../modal/modal";
import IngredientDetails from "../ingredient-details/ingredient-details";
import OrderDetails from "../order-details/order-details";
import { IngredientsContext } from "../../services/burgerContext";
import { OrderContext } from "../../services/orderContext";
import { createPortal } from "react-dom";
import { closeIngredient } from "../../services/actions/ingredient";

function App() {
  const {ingredients} = useSelector(({ingredients}) => ingredients)
  const {ingredient, opened: activeIngredientModal} = useSelector(({ ingredient }) => ingredient)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getIngredients())
  }, [])

  const modalsRoot = document.getElementById('modals')
  const ingredientsMemo = useMemo(() => ({ingredients}), [ingredients])
  const [buns, setBuns] = useState([])
  const [saucesAndFilling, setSaucesAndFilling] = useState([])
  const [orderNumber, setOrderNumber] = useState(null)
  const orderNumberMemo = useMemo(() => ({
    orderNumber, setOrderNumber
  }), [orderNumber])
  const [activeOrderModal, setActiveOrderModal] = useState(false)

  /**
   * Modals
   * @type {React.ReactPortal}
   */

  const orderModal = createPortal((
      <Modal active={activeOrderModal} handleClose={() => setActiveOrderModal(false)}>
        <OrderDetails/>
      </Modal>
  ), modalsRoot)
  const ingredientModal = createPortal((
      <Modal active={activeIngredientModal} handleClose={() => dispatch(closeIngredient())}>
        {ingredient && (
            <IngredientDetails
                img={ingredient.img}
                title={ingredient.title}
                properties={ingredient.properties}/>
        )}
      </Modal>
  ), modalsRoot)

  useEffect(() => {
    setBuns(filterBuns(ingredients))
    setSaucesAndFilling(filterSaucesAndFilling(ingredients))
  }, [ingredients])

  const filterBuns = (ingredients) => ingredients.filter((ingredient) => ingredient.type === 'bun')
  const filterSaucesAndFilling = (ingredients) => ingredients.filter((ingredient) => ingredient.type !== 'bun')

  return (
      <div className={styles.app}>
        <AppHeader/>
        <main className={styles.main}>
          <IngredientsContext.Provider value={ingredientsMemo}>
            <OrderContext.Provider value={orderNumberMemo}>
              <h2 className={`${styles.mainTitle} text text_type_main-large pb-5`}>Соберите бургер</h2>
              {ingredients && buns && saucesAndFilling && (
                  <>
                    <BurgerIngredients />
                    <BurgerConstructor
                        buns={buns}
                        saucesAndFilling={saucesAndFilling}
                        handleOpenModal={() => setActiveOrderModal(true)}
                    />
                  </>
              )}
              {activeOrderModal && orderModal}
              {activeIngredientModal && ingredientModal}
            </OrderContext.Provider>
          </IngredientsContext.Provider>
        </main>
      </div>
  );
}

export default App;
