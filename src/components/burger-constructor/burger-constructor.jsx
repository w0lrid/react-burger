import { Button, ConstructorElement, CurrencyIcon, } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burger-constructor.module.css";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ADD_INGREDIENT, getOrder, SET_BUN, SORT_INGREDIENTS } from "../../services/actions/order";
import { useDrop } from "react-dnd";
import Ingredient from "./ingredient/ingredient";

const BurgerConstructor = ({handleOpenModal}) => {
  const dispatch = useDispatch()
  const [totalPrice, setTotalPrice] = useState(0)
  const [orderIngredientsIds, setOrderIngredientsIds] = useState(null)
  const {
    ingredients: orderIngredients,
    bun,
  } = useSelector(store => store.order)
  const [ingredientsCount, setIngredientsCount] = useState(null)
  const [, dropRef] = useDrop({
    accept: 'ingredient',
    drop(ingredient) {
      dispatch({
        type: ADD_INGREDIENT,
        ingredient: {
          ...ingredient,
          count: (() => {
            let count = 1
            const currentIngredient = orderIngredients.find(orderIngredient => orderIngredient._id === ingredient._id)

            if (currentIngredient) {
              count = currentIngredient.count
            }

            orderIngredients.forEach(orderIngredient => {
              if (ingredient._id === orderIngredient._id) {
                ++count
              }
            })

            return count
          })()
        }
      })

    }
  })
  const [, dropBunRef] = useDrop({
    accept: 'bun',
    drop(bun) {
      dispatch({
        type: SET_BUN,
        bun,
      })
    }
  })

  useEffect(() => {
    const ingredientsCount = orderIngredients.reduce((prevIngredient, ingredient) => {
      prevIngredient[ingredient._id] = (prevIngredient[ingredient._id] || 0) + 1;

      return prevIngredient;
    }, {})

    setIngredientsCount(ingredientsCount)
  }, [orderIngredients])

  useEffect(() => {
    orderIngredients.forEach(ingredient => {
      setTotalPrice(totalPrice + getIngredientPrice(ingredient))
    })

    setOrderIngredientsIds(getIds(orderIngredients))
  }, [orderIngredients])

  const getIngredientPrice = (ingredient) => {
    if (ingredient.type === 'bun') return ingredient.price * 2

    if (ingredient.count) {
      return ingredient.price * ingredient.count
    }

    return ingredient.price
  }

  const getIds = (ingredients) => ingredients.map(ingredient => ingredient._id)

  const createOrder = () => {
    handleOpenModal()
    dispatch(getOrder(orderIngredientsIds))
  }
  const moveIngredient = (draggingIngredient, hoverIngredient) => {
    const dragIngredientIndex = orderIngredients.findIndex(el => el._id === draggingIngredient._id)
    const hoverIngredientIndex = orderIngredients.findIndex(el => el._id === hoverIngredient._id)
    const sortedIngredients = [...orderIngredients];

    sortedIngredients.splice(dragIngredientIndex, 1);
    sortedIngredients.splice(hoverIngredientIndex, 0, draggingIngredient);
    dispatch({
      type: SORT_INGREDIENTS,
      ingredients: sortedIngredients
    })
  }

  return (
      <div>
        <div className={styles.constructor} ref={dropBunRef}>
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
            {orderIngredients.map((ingredient) => [...Array(ingredientsCount).keys()].map(() => (
              <Ingredient
                ingredient={ingredient}
                moveIngredient={moveIngredient} />
            )))}
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
          <p className="text text_type_main-large">{totalPrice} <CurrencyIcon type="primary"/></p>
          <Button
            htmlType="button"
            type="primary"
            size="large"
            onClick={createOrder}
          >
            Оформить заказ
          </Button>
        </div>
      </div>
  )
}

BurgerConstructor.propTypes = {
  isLocked: PropTypes.bool,
  handleOpenModal: PropTypes.func,
}

export default BurgerConstructor
