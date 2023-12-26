import styles from '../../components/app/app.module.css';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import BurgerIngredients from '../../components/burger-ingredients/burger-ingredients';
import BurgerConstructor from '../../components/burger-constructor/burger-constructor';
import React, { useEffect, useState } from 'react';
import Modal from '../../components/modal/modal';
import OrderDetails from '../../components/order-details/order-details';
import { TIngredient } from '../../types/types';
import { useDispatch, useSelector } from '../../utils/hooks';
import { getIngredientsFromStore, getOrderFromStore } from '../../services/selectors/order';
import { closeIngredient } from '../../services/actions/ingredient';

const BurgerConstructorPage = () => {
  const dispatch = useDispatch();
  const { ingredients } = useSelector(getIngredientsFromStore);
  const { order } = useSelector(getOrderFromStore);

  const [buns, setBuns] = useState<TIngredient[]>([]);
  const [saucesAndFilling, setSaucesAndFilling] = useState<TIngredient[]>([]);
  const [activeOrderModal, setActiveOrderModal] = useState<boolean>(false);

  /**
   * Modals
   * @type {React.ReactPortal}
   */

  const orderModal = (
    <>
      {order && (
        <Modal
          handleClose={() => {
            dispatch(closeIngredient());
          }}
        >
          <OrderDetails orderNumber={order.number} />
        </Modal>
      )}
    </>
  );

  useEffect(() => {
    setBuns(filterBuns(ingredients));
    setSaucesAndFilling(filterSaucesAndFilling(ingredients));
  }, [ingredients]);

  const filterBuns = (ingredients: TIngredient[]) => ingredients.filter((ingredient) => ingredient.type === 'bun');
  const filterSaucesAndFilling = (ingredients: TIngredient[]) =>
    ingredients.filter((ingredient) => ingredient.type !== 'bun');

  return (
    <main className={styles.main}>
      <h2 className={`${styles.mainTitle} text text_type_main-large pb-5`}>Соберите бургер</h2>
      {ingredients && buns && saucesAndFilling && (
        <>
          <DndProvider backend={HTML5Backend}>
            <BurgerIngredients />
            <BurgerConstructor handleOpenModal={() => setActiveOrderModal(true)} />
          </DndProvider>
        </>
      )}
      {activeOrderModal && orderModal}
    </main>
  );
};

export default BurgerConstructorPage;
