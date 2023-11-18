import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './modal.module.css';
import { useEffect } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom/client';
import { createPortal } from 'react-dom';

const Modal = ({ children, active, handleClose }) => {
  const modalsRoot = document.getElementById('modals');

  useEffect(() => {
    function closeByEscape(evt) {
      if (evt.key === 'Escape') {
        handleClose();
      }
    }

    if (active) {
      document.addEventListener('keydown', closeByEscape);

      return () => {
        document.removeEventListener('keydown', closeByEscape);
      };
    }
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
