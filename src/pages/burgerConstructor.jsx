import styles from '../components/app/app.module.css';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import BurgerIngredients from '../components/burger-ingredients/burger-ingredients';
import BurgerConstructor from '../components/burger-constructor/burger-constructor';
import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import Modal from '../components/modal/modal';
import OrderDetails from '../components/order-details/order-details';
import { useSelector } from 'react-redux';
import { getIngredientsFromStore, getOrderFromStore } from '../services/selectors/order';

const BurgerConstructorPage = () => {
  const { ingredients } = useSelector(getIngredientsFromStore);
  const { order } = useSelector(getOrderFromStore);

  const modalsRoot = document.getElementById('modals');
  const [buns, setBuns] = useState([]);
  const [saucesAndFilling, setSaucesAndFilling] = useState([]);
  const [activeOrderModal, setActiveOrderModal] = useState(false);

  /**
   * Modals
   * @type {React.ReactPortal}
   */

  const orderModal = createPortal(
    <>
      {order && (
        <Modal active={activeOrderModal} handleClose={() => setActiveOrderModal(false)}>
          <OrderDetails orderNumber={order.number} />
        </Modal>
      )}
    </>,
    modalsRoot,
  );

  useEffect(() => {
    setBuns(filterBuns(ingredients));
    setSaucesAndFilling(filterSaucesAndFilling(ingredients));
  }, [ingredients]);

  const filterBuns = (ingredients) => ingredients.filter((ingredient) => ingredient.type === 'bun');
  const filterSaucesAndFilling = (ingredients) => ingredients.filter((ingredient) => ingredient.type !== 'bun');

  return (
    <main className={styles.main}>
      <h2 className={`${styles.mainTitle} text text_type_main-large pb-5`}>Соберите бургер</h2>
      {ingredients && buns && saucesAndFilling && (
        <>
          <DndProvider backend={HTML5Backend}>
            <BurgerIngredients />
            <BurgerConstructor
              buns={buns}
              saucesAndFilling={saucesAndFilling}
              handleOpenModal={() => setActiveOrderModal(true)}
            />
          </DndProvider>
        </>
      )}
      {activeOrderModal && orderModal}
    </main>
  );
};

export default BurgerConstructorPage;
