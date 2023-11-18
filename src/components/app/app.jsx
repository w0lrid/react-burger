import React, { useEffect } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import {
  BurgerConstructorPage,
  LoginPage,
  RegisterPage,
  ForgotAndResetPasswordPage,
  Profile,
  FeedPage,
} from '../../pages';
import ProtectedRouteElement from '../protected-route-element/protected-route-element';
import IngredientDetails from '../ingredient-details/ingredient-details';
import Modal from '../modal/modal';
import { createPortal } from 'react-dom';
import { closeIngredient } from '../../services/actions/ingredient';
import { useDispatch, useSelector } from 'react-redux';
import { getIngredientFromStore } from '../../services/selectors/order';
import AppHeader from '../app-header/app-header';
import styles from './app.module.css';
import { getIngredients } from '../../services/actions/ingredients';
import { getFeedFromStore } from '../../services/selectors/feed';
import { closeFeed } from '../../services/actions/selectedFeed';
import SelectedFeed from '../selected-feed/selected-feed';

function App() {
  window.history.replaceState({}, document.title);

  const location = useLocation();
  const navigate = useNavigate();
  const background = location.state && location.state.background;
  const dispatch = useDispatch();

  const { opened: activeIngredientModal } = useSelector(getIngredientFromStore);
  const { ingredients } = useSelector((state) => state.ingredients);
  const { feed, opened: activeFeedModel } = useSelector(getFeedFromStore);

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
        dispatch(closeFeed());
      }}
    >
      {feed && <SelectedFeed />}
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
            <Route path="/profile/*" element={<ProtectedRouteElement element={<Profile />} />} />
            <Route path="/feed" element={<FeedPage />} />
            <Route path="/feed/:number" element={<SelectedFeed />} />
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
