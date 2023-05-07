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

function App() {
  const {ingredients} = useSelector(state => state.ingredients)
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
  const [activeIngredientModal, setActiveIngredientModal] = useState(false)
  const [modalIngredientData, setModalIngredientData] = useState(null)

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
      <Modal active={activeIngredientModal} handleClose={() => setActiveIngredientModal(false)}>
        {modalIngredientData && (
            <IngredientDetails
                img={modalIngredientData.img}
                title={modalIngredientData.title}
                properties={modalIngredientData.properties}/>
        )}
      </Modal>
  ), modalsRoot)

  useEffect(() => {
    setBuns(filterBuns(ingredients))
    setSaucesAndFilling(filterSaucesAndFilling(ingredients))
  }, [ingredients])

  const handleIngredientInfo = (ingredientInfo) => {
    setActiveIngredientModal(true)
    setModalIngredientData(ingredientInfo)
  }
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
                    <BurgerIngredients data={ingredients} handleIngredientInfo={handleIngredientInfo}/>
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
