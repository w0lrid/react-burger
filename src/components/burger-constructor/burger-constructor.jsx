import {
  Button,
  ConstructorElement,
  CurrencyIcon,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burger-constructor.module.css";
import PropTypes from "prop-types";

const BurgerConstructor = ({data, handleOpenModal}) => (
  <div>
    <div className={styles.constructor}>
      {data.slice(0, 1).map(({_id, name, image, price}, index) => (
        <div
          className={styles.bun}
          key={_id}
        >
          <ConstructorElement
            isLocked
            type="top"
            text={`${name} (верх)`}
            thumbnail={image}
            price={price}
          />
        </div>
      ))}
      <div className={styles.scrollableIngredients}>
        {data.slice(1).map(({_id, name, image, price}, index) => (
            <div
              className={styles.element}
              key={_id}
            >
              <DragIcon type="primary"/>
              <ConstructorElement
                text={name}
                thumbnail={image}
                price={price}
              />
            </div>
          )
        )}
      </div>
      {data.slice(0, 1).map(({_id, name, image, price}, index) => (
        <div
          className={styles.bun}
          key={_id}
        >
          <ConstructorElement
            isLocked
            type="bottom"
            text={`${name} (низ)`}
            thumbnail={image}
            price={price}
          />
        </div>
      ))}
    </div>
    <div className={styles.order}>
      <p className="text text_type_main-large">610 <CurrencyIcon type="primary"/></p>
      <Button
        htmlType="button"
        type="primary"
        size="large"
        onClick={handleOpenModal}
      >
        Оформить заказ
      </Button>
    </div>
  </div>
)

BurgerConstructor.propTypes = {
  isLocked: PropTypes.bool
}

export default BurgerConstructor