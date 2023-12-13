import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './modal.module.css';
import { FC, ReactNode, ReactPortal, useEffect } from 'react';
import { createPortal } from 'react-dom';

type TModal = {
  children: ReactNode;
  handleClose: () => void;
};

const Modal: FC<TModal> = ({ children, handleClose }) => {
  const modalsRoot = document.getElementById('modals') as HTMLDivElement;

  useEffect(() => {
    function closeByEscape(evt: KeyboardEvent) {
      if (evt.key === 'Escape') {
        handleClose();
      }
    }

    document.addEventListener('keydown', closeByEscape);

    return () => {
      document.removeEventListener('keydown', closeByEscape);
    };
  }, []);

  if (modalsRoot) {
    return createPortal(
      <div className={`${styles.overlay} ${styles.overlayActive}`} onClick={handleClose}>
        <div className={styles.modal} onClick={(event) => event.stopPropagation()}>
          <div className={styles.closeIcon}>
            <CloseIcon type="primary" onClick={handleClose} />
          </div>
          {children}
        </div>
      </div>,
      modalsRoot
    );
  } else {
    return <></>;
  }
};

export default Modal;
