import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './modal.module.css';
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';
import { useLocation, useParams } from 'react-router-dom';

const Modal = ({ children, handleClose }) => {
  const modalsRoot = document.getElementById('modals');
  const location = useLocation();
  const params = useParams();
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (
      (params.ingredientId && location.pathname.includes(params.ingredientId)) ||
      (params.number && location.pathname.includes(params.number)) ||
      (params.id && location.pathname.includes(params.id))
    ) {
      setActive(true);
    }
  }, []);

  useEffect(() => {
    function closeByEscape(evt) {
      if (evt.key === 'Escape') {
        setActive(false);
        handleClose();
      }
    }

    document.addEventListener('keydown', closeByEscape);

    return () => {
      document.removeEventListener('keydown', closeByEscape);
    };
  }, [active]);

  return createPortal(
    <div className={`${styles.overlay} ${active && styles.overlayActive}`} onClick={handleClose}>
      <div className={styles.modal} onClick={(event) => event.stopPropagation()}>
        <div className={styles.closeIcon}>
          <CloseIcon type="primary" onClick={handleClose} />
        </div>
        {children}
      </div>
    </div>,
    modalsRoot,
  );
};

Modal.propTypes = {
  children: PropTypes.node,
  active: PropTypes.bool,
  handleClose: PropTypes.func,
};

export default Modal;
