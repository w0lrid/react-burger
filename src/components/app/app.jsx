import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { BurgerConstructorPage, LoginPage, RegisterPage, ForgotAndResetPasswordPage, Profile } from "../../pages";
import ProtectedRouteElement from "../protected-route-element/protected-route-element";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<BurgerConstructorPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotAndResetPasswordPage />} />
        <Route path="/reset-password" element={<ForgotAndResetPasswordPage />} />
        <Route path="/profile/*" element={<ProtectedRouteElement element={<Profile />}/>} />
      </Routes>
    </Router>
  );
}

export default App;
