// import OrderDetails from "../order-details/order-details";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./modal.module.css";
import { useEffect } from "react";
import OrderDetails from "../order-details/order-details";
// import IngredientDetails from "../ingredient-details/ingredient-details";

const Modal = ({children, active, handleClose}) => {
  const isOpen = active

  useEffect(() => {
    function closeByEscape(evt) {
      if (evt.key === 'Escape') {
        handleClose();
      }
    }

    if (isOpen) { // навешиваем только при открытии
      document.addEventListener('keydown', closeByEscape);

      return () => {
        document.removeEventListener('keydown', closeByEscape);
      }
    }
  }, [isOpen])

  return (
    <div className={`${styles.overlay} ${active && styles.overlayActive}`} onClick={handleClose}>
      <div className={styles.modal}>
        <div className={styles.closeIcon}>
          <CloseIcon type="primary" onClick={handleClose}/>
        </div>
        {children}
        {/*<OrderDetails/>
        <IngredientDetails img={img} name={name} properties={properties}/>*/}
      </div>
    </div>
  )
}

export default Modal;