import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './ingredient.module.css';
import PropTypes from 'prop-types';
import { TypeIngredient } from '../../../utils/types';
import { useDispatch } from 'react-redux';
import { showIngredient } from '../../../services/actions/ingredient';
import { useDrag } from 'react-dnd';
import { Link, useLocation } from 'react-router-dom';

const Ingredient = ({ ingredient }) => {
  const location = useLocation();
  const { _id, image, price, name, type, count } = ingredient;
  const dispatch = useDispatch();
  const [{ isDrag }, dragRef] = useDrag({
    type: type === 'bun' ? 'bun' : 'ingredient',
    item: ingredient,
    collect: (monitor) => ({
      isDrag: monitor.isDragging(),
    }),
  });

  return (
    <Link key={_id} to={`/ingredients/${_id}`} state={{ background: location }} className={styles.link}>
      <div
        className={`${styles.ingredientCard} ${isDrag ? styles.ingredientCardDragging : ''}`}
        onClick={() => dispatch(showIngredient(ingredient))}
        ref={dragRef}
      >
        {count > 0 && <Counter count={count} extraClass={styles.cardCounter} />}
        <img src={image} alt={name} className="img" />
        <p className="text text_type_main-medium">
          {price} <CurrencyIcon type="primary" />
        </p>
        <p className="text text_type_main-default">{name}</p>
      </div>
    </Link>
  );
};

Ingredient.propTypes = {
  ingredient: TypeIngredient.isRequired,
  handleOpenModal: PropTypes.func,
};

export default Ingredient;
