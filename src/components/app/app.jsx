import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { BurgerConstructorPage, LoginPage, RegisterPage, ForgotAndResetPasswordPage } from "../../pages";

function App() {
  return (
    <Router>
      <Routes>
          <Route path="/" element={<BurgerConstructorPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/forgot-password" element={<ForgotAndResetPasswordPage />} />
          <Route path="/reset-password" element={<ForgotAndResetPasswordPage />} />
      </Routes>
    </Router>
  );
}

export default App;
