import {
  Button,
  ConstructorElement,
  CurrencyIcon,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burger-constructor.module.css";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ADD_INGREDIENT, getOrder, REMOVE_INGREDIENT } from "../../services/actions/order";
import { useDrop } from "react-dnd";

const BurgerConstructor = ({buns, saucesAndFilling, handleOpenModal}) => {
  const dispatch = useDispatch()
  const [totalPrice, setTotalPrice] = useState(0)
  const [orderIngredientsIds, setOrderIngredientsIds] = useState(null)
  const {ingredients: orderIngredients} = useSelector(store => store.order)
  const [bun, setBun] = useState(null)
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
    drop(ingredient) {
      dispatch({
        type: ADD_INGREDIENT,
        ingredient,
      })
    }
  })

  useEffect(() => {
    if (typeof buns !== 'null' && typeof saucesAndFilling !== 'null')
      setTotalPrice(getPriceSum(saucesAndFilling) + getPriceSum(buns.slice(0, 1)) * 2)
    setOrderIngredientsIds(getIds(saucesAndFilling))
  }, [buns, saucesAndFilling])

  useEffect(() => {
    orderIngredients.forEach(ingredient => {
     if (ingredient.type === 'bun') {
       setBun(ingredient)
     }
    })
  }, [orderIngredients])

  const getPriceSum = (ingredients) => {
    let sum = 0

    ingredients.forEach((ingredient) => {
      sum += ingredient.price
    })

    return sum
  }
  const getIds = (ingredients) => {
    const ids = ingredients.map((ingredient) => ingredient._id)
    if (buns[0]) {
      ids.push(buns[0]._id, buns[0]._id)
    }
    return ids
  }

  const createOrder = () => {
    handleOpenModal()
    dispatch(getOrder(orderIngredientsIds))
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
            {orderIngredients.map(({_id, name, image, price, count}) => {
              if (count > 1) {
                return [...Array(count).keys()].map(() => (
                  <div className={styles.element} key={_id}>
                    <DragIcon type="primary"/>
                    <ConstructorElement
                      text={name}
                      thumbnail={image}
                      price={price}
                      handleClose={() => {
                        dispatch({
                          type: REMOVE_INGREDIENT,
                          _id,
                        })
                      }}
                    />
                  </div>
                ))
              }
              if (count === 1) {
                return (
                  <div className={styles.element} key={_id}>
                    <DragIcon type="primary"/>
                    <ConstructorElement
                      text={name}
                      thumbnail={image}
                      price={price}
                      handleClose={() => {
                        dispatch({
                          type: REMOVE_INGREDIENT,
                          _id,
                        })
                      }}
                    />
                  </div>
                )
              }
              }
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
