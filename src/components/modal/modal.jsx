import OrderDetails from "../order-details/order-details";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./modal.module.css";
import IngredientDetails from "../ingredient-details/ingredient-details";

const Modal = ({type, active, handleClose, img, name, properties}) => {
  return (
    <div className={`${styles.overlay} ${active && styles.overlayActive}`} onClick={handleClose}>
      <div className={styles.modal}>

        <div className={styles.closeIcon}>
          <CloseIcon type="primary" onClick={handleClose}/>
        </div>
        {type === 'order' &&<OrderDetails/>}
        {type === 'ingredient' && <IngredientDetails img={img} name={name} properties={properties}/>}
      </div>
    </div>
  )
}

export default Modal;