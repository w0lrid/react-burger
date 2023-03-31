import { Button, ConstructorElement, CurrencyIcon, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import data from "../data";
import styles from "./burger-constructor.module.css";
import PropTypes from "prop-types";

const BurgerConstructor = ({isLocked}) => {
  return (
    <div>
      <div className={styles.constructor}>
        {data.map(({_id, name, image, price}, index) => (
            <div className={styles.element}>
              {!isLocked && (
                <DragIcon type="primary"/>
              )}
              <ConstructorElement
                type={index === 0
                  ? "top"
                  : index === data.length - 1
                    ? "bottom"
                    : ""
                }
                key={_id}
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
        >
          Оформить заказ
        </Button>
      </div>
    </div>
  )
}

BurgerConstructor.propTypes = {
  isLocked: PropTypes.bool
}

export default BurgerConstructor