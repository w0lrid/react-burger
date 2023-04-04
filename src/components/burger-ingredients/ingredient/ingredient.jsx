import { Counter, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./ingredient.module.css";
import PropTypes from "prop-types";
import Modal from "../../modal/modal";
import { useState } from "react";

const Ingredient = ({img, price, title, properties}) => {
  const [activeModal, setActiveModal] = useState(false)

  return (
    <>
      <div className={styles.ingredientCard} onClick={() => setActiveModal(true)}>
        <Counter count={1} extraClass={styles.cardCounter}/>
        <img src={img} alt={title} className="img"/>
        <p className="text text_type_main-medium">{price} <CurrencyIcon type="primary"/></p>
        <p className="text text_type_main-default">{title}</p>
      </div>
      <Modal
        type="ingredient"
        active={activeModal}
        handleClose={() => setActiveModal(false)}
        img={img}
        name={title}
        properties={properties}
      />
    </>
  )
}

Ingredient.propTypes = {
  img: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
}

export default Ingredient;