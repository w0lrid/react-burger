import { Button, ConstructorElement, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-constructor.module.css';
import { FC, useEffect, useState } from 'react';
import { getOrder } from '../../services/actions/order';
import { useDrop } from 'react-dnd';
import Ingredient from './ingredient/ingredient';
import { useNavigate } from 'react-router-dom';
import { TIngredient } from '../../types/types';
import { ADD_INGREDIENT, SET_BUN, SORT_INGREDIENTS } from '../../services/constants/order';
import { useDispatch, useSelector } from '../../utils/hooks';
import { getOrderFromStore, getUserFromStore } from '../../services/selectors/order';

type TBurgerConstructor = {
  handleOpenModal: () => void;
};
const BurgerConstructor: FC<TBurgerConstructor> = ({ handleOpenModal }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [orderIngredientsIds, setOrderIngredientsIds] = useState<string[]>([]);
  const { ingredients: orderIngredients, bun } = useSelector(getOrderFromStore);
  const [lockBunPrice, setLockBunPrice] = useState<boolean>(false);
  const [ingredientsCount, setIngredientsCount] = useState<Record<string, number>>({});
  const { user } = useSelector(getUserFromStore);
  const { orderRequest } = useSelector(getOrderFromStore);
  const [, dropRef] = useDrop({
    accept: 'ingredient',
    drop(ingredient: TIngredient) {
      dispatch({
        type: ADD_INGREDIENT,
        ingredient: {
          ...ingredient,
          count: (() => {
            let count = 1;
            const currentIngredient = orderIngredients.find(
              (orderIngredient: TIngredient) => orderIngredient._id === ingredient._id
            );

            if (currentIngredient) {
              count = currentIngredient.count;
            }

            orderIngredients.forEach((orderIngredient: TIngredient) => {
              if (ingredient._id === orderIngredient._id) {
                ++count;
              }
            });

            return count;
          })(),
        },
      });
    },
  });
  const [, dropBunRef] = useDrop({
    accept: 'bun',
    drop(bun) {
      dispatch({
        type: SET_BUN,
        bun,
      });
    },
  });

  useEffect(() => {
    const ingredientsCount = orderIngredients.reduce<Record<string, number>>((prevIngredient, ingredient) => {
      prevIngredient[ingredient._id] = (prevIngredient[ingredient._id] || 0) + 1;

      return prevIngredient;
    }, {});

    setIngredientsCount(ingredientsCount);
  }, [orderIngredients]);

  useEffect(() => {
    orderIngredients.forEach((ingredient: TIngredient) => {
      setTotalPrice(totalPrice + getIngredientPrice(ingredient));
    });

    if (bun && !lockBunPrice) {
      setTotalPrice(totalPrice + getIngredientPrice(bun));
      setLockBunPrice(true);
    }

    setOrderIngredientsIds(getIds(orderIngredients));
  }, [orderIngredients, bun]);

  const getIngredientPrice = (ingredient: TIngredient) => {
    if (ingredient.type === 'bun') {
      return ingredient.price * 2;
    }

    return ingredient.price;
  };

  const getIds = (ingredients: TIngredient[]) => ingredients.map((ingredient) => ingredient._id);

  const createOrder = () => {
    if (!user) {
      navigate('/login');
    } else {
      handleOpenModal();
      dispatch(getOrder(orderIngredientsIds));
    }
  };
  const moveIngredient = (draggingIngredient: TIngredient, hoverIngredient: TIngredient) => {
    const dragIngredientIndex = orderIngredients.findIndex((el: TIngredient) => el._id === draggingIngredient._id);
    const hoverIngredientIndex = orderIngredients.findIndex((el: TIngredient) => el._id === hoverIngredient._id);
    const sortedIngredients = [...orderIngredients];

    sortedIngredients.splice(dragIngredientIndex, 1);
    sortedIngredients.splice(hoverIngredientIndex, 0, draggingIngredient);
    dispatch({
      type: SORT_INGREDIENTS,
      ingredients: sortedIngredients,
    });
  };

  return (
    <div>
      <div className={styles.builder} ref={dropBunRef}>
        <div className={styles.bun}>
          {bun && (
            <ConstructorElement
              isLocked
              type="top"
              text={`${bun.name} (верх)`}
              thumbnail={bun.image}
              price={bun.price}
            />
          )}
        </div>
        <div className={styles.scrollableIngredients} ref={dropRef}>
          {orderIngredients.map((ingredient) =>
            [...Array(ingredientsCount).keys()].map(() => (
              <Ingredient key={ingredient._id} ingredient={ingredient} moveIngredient={moveIngredient} />
            ))
          )}
        </div>
        <div className={styles.bun}>
          {bun && (
            <ConstructorElement
              isLocked
              type="bottom"
              text={`${bun.name} (низ)`}
              thumbnail={bun.image}
              price={bun.price}
            />
          )}
        </div>
      </div>
      <div className={styles.order}>
        <p className="text text_type_main-large">
          {totalPrice} <CurrencyIcon type="primary" />
        </p>
        <Button htmlType="button" type="primary" size="large" onClick={createOrder}>
          {orderRequest ? 'Формируем заказ...' : 'Оформить заказ'}
        </Button>
      </div>
    </div>
  );
};

export default BurgerConstructor;
