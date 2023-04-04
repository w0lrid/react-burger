import { Button, ConstructorElement, CurrencyIcon, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
// import data from "../data";
import styles from "./burger-constructor.module.css";
import PropTypes from "prop-types";
import Modal from "../modal/modal";
import { useState } from "react";

const BurgerConstructor = ({data, isLocked}) => {
  const [activeModal, setActiveModal] = useState(false)
  const checkFirstLastIngredient = (index) => {
    if (index === 0) {
      return "top"
    } else if (index === data.length - 1) {
      return "bottom"
    } else {
      return ""
    }
  }

  return (
    <div>
      <div className={styles.constructor}>
        {data.map(({_id, name, image, price}, index) => (
            <div
              className={styles.element}
              key={_id}
            >
              {!isLocked && !checkFirstLastIngredient(index) && (
                <DragIcon type="primary"/>
              )}
              <ConstructorElement
                type={checkFirstLastIngredient(index)}
                text={name}
                thumbnail={image}
                price={price}
              />
            </div>
          )
        )}
      </div>
      <div className={styles.order}>
        <p className="text text_type_main-large">610 <CurrencyIcon type="primary"/></p>
        <Button
          htmlType="button"
          type="primary"
          size="large"
          onClick={() => setActiveModal(true)}
        >
          Оформить заказ
        </Button>
      </div>
      <Modal
        type='order'
        active={activeModal}
        handleClose={() => setActiveModal(false)}
       />
    </div>
  )
}

BurgerConstructor.propTypes = {
  isLocked: PropTypes.bool
}

export default BurgerConstructor