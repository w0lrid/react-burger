import styles from "../burger-constructor.module.css";
import { ConstructorElement, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { REMOVE_INGREDIENT } from "../../../services/actions/order";
import { useDrag, useDrop } from "react-dnd";
import { useDispatch } from "react-redux";
import { useRef } from "react";

const Ingredient = ({ingredient, moveIngredient}) => {
  const ref = useRef(null);
  const {_id, name, image, price} = ingredient;
  const dispatch = useDispatch();
  const [, drop] = useDrop({
    accept: 'draggableIngredient',
    hover: (draggingIngredient, monitor) => {
      const dragIndex = draggingIngredient._id;
      const hoverIndex = ingredient._id;

      if (dragIndex === hoverIndex) {
        return;
      }

      const hoverBoundingRect = ref.current?.getBoundingClientRect()
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
      const clientOffset = monitor.getClientOffset()
      const hoverClientY = clientOffset.y - hoverBoundingRect.top

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return
      }

      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return
      }

      moveIngredient(draggingIngredient, ingredient);
    }
  })
  const [{isDrag}, drag] = useDrag({
    type: 'draggableIngredient',
    item: ingredient,
    collect: monitor => ({
      isDrag: monitor.isDragging(),
    })
  });

  const opacity = isDrag ? 0 : 1;
  drag(drop(ref))

  return (
    <div className={styles.element} key={_id} style={{ opacity }} ref={ref}>
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

export default Ingredient