import { CheckMarkIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './order-details.module.css';

const OrderDetails = ({ orderNumber }: { orderNumber: number }) => {
  return (
    <div className={styles.orderDetails}>
      <p className={`${styles.orderNumber} text text_type_digits-large`}>{orderNumber}</p>
      <p className={`${styles.subtitle} text text_type_main-medium`}>идентификатор заказа</p>
      <div className={styles.tickContainer}>
        <CheckMarkIcon type="primary" />
      </div>
      <div className={styles.orderText}>
        <p className="text text_type_main-small">Ваш заказ начали готовить</p>
        <p className="text text_type_main-small text_color_inactive">Дождитесь готовности на орбитальной станции</p>
      </div>
    </div>
  );
};

export default OrderDetails;
