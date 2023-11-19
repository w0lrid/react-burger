import React, { useEffect } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import {
  BurgerConstructorPage,
  LoginPage,
  RegisterPage,
  ForgotAndResetPasswordPage,
  UserEdit,
  FeedPage,
  UserFeedPage,
} from '../../pages';
import ProtectedRouteElement from '../protected-route-element/protected-route-element';
import IngredientDetails from '../ingredient-details/ingredient-details';
import Modal from '../modal/modal';
import { closeIngredient } from '../../services/actions/ingredient';
import { useDispatch, useSelector } from 'react-redux';
import { getIngredientFromStore } from '../../services/selectors/order';
import AppHeader from '../app-header/app-header';
import styles from './app.module.css';
import { getIngredients } from '../../services/actions/ingredients';
import { getSelectedOrderFromStore } from '../../services/selectors/feed';
import { closeSelectedOrder } from '../../services/actions/selected-order';
import SelectedOrder from '../selected-order/selected-order';

function App() {
  window.history.replaceState({}, document.title);

  const location = useLocation();
  const navigate = useNavigate();
  const background = location.state && location.state.background;
  const dispatch = useDispatch();

  const { opened: activeIngredientModal } = useSelector(getIngredientFromStore);
  const { ingredients } = useSelector((state) => state.ingredients);
  const { selectedOrder, opened: activeFeedModel } = useSelector(getSelectedOrderFromStore);

  useEffect(() => {
    dispatch(getIngredients());
  }, []);

  const ingredientModal = (
    <Modal
      active={activeIngredientModal}
      handleClose={() => {
        navigate(-1);
        dispatch(closeIngredient());
      }}
    >
      <IngredientDetails />
    </Modal>
  );

  const selectedFeedModal = (
    <Modal
      active={activeFeedModel}
      handleClose={() => {
        navigate(-1);
        dispatch(closeSelectedOrder());
      }}
    >
      {selectedOrder && <SelectedOrder />}
    </Modal>
  );

  return (
    <div className={styles.app}>
      <AppHeader />
      {ingredients.length > 0 && (
        <>
          <Routes location={background || location}>
            <Route path="/" element={<BurgerConstructorPage />} />
            <Route path="/ingredients/:ingredientId" element={<IngredientDetails />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/forgot-password" element={<ForgotAndResetPasswordPage />} />
            <Route path="/reset-password" element={<ForgotAndResetPasswordPage />} />
            <Route exact path="/profile" element={<ProtectedRouteElement element={<UserEdit />} />} />
            <Route exact path="/profile/orders" element={<ProtectedRouteElement element={<UserFeedPage />} />} />
            {/*<Route path="/profile" element={<UserEdit />} />*/}
            <Route path="/feed" element={<FeedPage />} />
            <Route path="/feed/:number" element={<SelectedOrder />} />
          </Routes>

          {background && (
            <Routes>
              <Route path="/ingredients/:ingredientId" element={<>{ingredientModal}</>} />
              <Route path="/feed/:number" element={<>{selectedFeedModal}</>} />
            </Routes>
          )}
        </>
      )}
    </div>
  );
}

export default App;
