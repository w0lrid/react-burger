import React, { useEffect, useState } from 'react';
import { ingredientsURL } from "../../config/constants";
import styles from './app.module.css';
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import Modal from "../modal/modal";
import IngredientDetails from "../ingredient-details/ingredient-details";
import OrderDetails from "../order-details/order-details";

function App() {
  const [ingredients, setIngredients] = useState(null)
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
        .then(({data}) => setIngredients(data))
        .catch((error) => console.error(error));

    fetchData();
  }, [])

  const handleIngredientInfo = (ingredientInfo) => {
    setActiveIngredientModal(true)
    setModalIngredientData(ingredientInfo)
  }

  return (
    <div className={styles.app}>
      <AppHeader/>
      <main className={styles.main}>
        <h2 className={`${styles.mainTitle} text text_type_main-large pb-5`}>Соберите бургер</h2>
        {ingredients && (
          <>
            <BurgerIngredients data={ingredients} handleIngredientInfo={handleIngredientInfo}/>
            <BurgerConstructor data={ingredients} handleOpenModal={() => setActiveOrderModal(true)}/>
          </>
        )}
        <Modal active={activeOrderModal} handleClose={() => setActiveOrderModal(false)}>
          <OrderDetails/>
        </Modal>
        {modalIngredientData && (
          <Modal active={activeIngredientModal} handleClose={() => setActiveIngredientModal(false)}>
            <IngredientDetails
              img={modalIngredientData.img}
              title={modalIngredientData.title}
              properties={modalIngredientData.properties}/>
          </Modal>
        )}
      </main>
    </div>
  );
}

export default App;