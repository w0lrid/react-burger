import React, { useEffect, useMemo, useState } from 'react';
import { ingredientsURL } from "../../config/constants";
import styles from './app.module.css';
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import Modal from "../modal/modal";
import IngredientDetails from "../ingredient-details/ingredient-details";
import OrderDetails from "../order-details/order-details";
import { IngredientsContext } from "../../services/burgerContext";
import { OrderContext } from "../../services/orderContext";

function App() {
  const [ingredients, setIngredients] = useState([])
  const ingredientsMemo = useMemo(() => ({
    ingredients, setIngredients
  }), [ingredients])
  const [buns, setBuns] = useState([])
  const [saucesAndFilling, setSaucesAndFilling] = useState([])
  const [orderNumber, setOrderNumber] = useState(null)
  const orderNumberMemo = useMemo(() => ({
    orderNumber, setOrderNumber
  }), [orderNumber])
  const [activeOrderModal, setActiveOrderModal] = useState(false)
  const [activeIngredientModal, setActiveIngredientModal] = useState(false)
  const [modalIngredientData, setModalIngredientData] = useState(null)

  useEffect(() => {
    const fetchData = () =>
        fetch(ingredientsURL)
            .then((response) => {
              if (response.ok) {
                return response.json()
              }

              return Promise.reject(`Ошибка ${response.status}`);
            })
            .then(({data}) => {
              setIngredients(data)
              setBuns(filterBuns(data))
              setSaucesAndFilling(filterSaucesAndFilling(data))
            })
            .catch((error) => console.error(error));

    fetchData();
  }, [])

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
              <Modal active={activeOrderModal} handleClose={() => setActiveOrderModal(false)}>
                <OrderDetails/>
              </Modal>
              <Modal active={activeIngredientModal} handleClose={() => setActiveIngredientModal(false)}>
                {modalIngredientData && (
                    <IngredientDetails
                        img={modalIngredientData.img}
                        title={modalIngredientData.title}
                        properties={modalIngredientData.properties}/>
                )}
              </Modal>
            </OrderContext.Provider>
          </IngredientsContext.Provider>
        </main>
      </div>
  );
}

export default App;
