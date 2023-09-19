import React from 'react';
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { BurgerConstructorPage, LoginPage, RegisterPage, ForgotAndResetPasswordPage, Profile } from "../../pages";
import ProtectedRouteElement from "../protected-route-element/protected-route-element";
import IngredientDetails from "../ingredient-details/ingredient-details";
import Modal from "../modal/modal";
import { createPortal } from "react-dom";
import { closeIngredient } from "../../services/actions/ingredient";
import { useDispatch, useSelector } from "react-redux";
import { getIngredientFromStore } from "../../services/selectors/order";

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const background = location.state && location.state.background;
  const dispatch = useDispatch();

  const {ingredient, opened: activeIngredientModal} = useSelector(getIngredientFromStore);
  const modalsRoot = document.getElementById('modals')

  const ingredientModal = createPortal((
    <Modal active={activeIngredientModal} handleClose={() => {
      handleModalClose();
      dispatch(closeIngredient());
    }}>
      {ingredient && (
        <IngredientDetails
          image={ingredient.image}
          name={ingredient.name}
          properties={ingredient.properties}/>
      )}
    </Modal>
  ), modalsRoot)

  const handleModalClose = () => {
    navigate(-1);
  };

  return (
    <>
      <Routes location={background || location}>
        <Route path="/" element={<BurgerConstructorPage />} />
        <Route
          path='/ingredients/:ingredientId'
          element={ingredient && (
            <IngredientDetails
              image={ingredient.image}
              name={ingredient.name}
              properties={ingredient.properties} />
          )} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotAndResetPasswordPage />} />
        <Route path="/reset-password" element={<ForgotAndResetPasswordPage />} />
        <Route path="/profile/*" element={<ProtectedRouteElement element={<Profile />}/>} />
      </Routes>

      {background && (
        <Routes>
          <Route
            path='/ingredients/:ingredientId'
            element={<>{ingredientModal}</>}
          />
        </Routes>
      )}
    </>
  );
}

export default App;
