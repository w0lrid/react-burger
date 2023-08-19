import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { BurgerConstructorPage, LoginPage, RegisterPage } from "../../pages";

function App() {
  return (
    <Router>
      <Routes>
          <Route path="/" element={<BurgerConstructorPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </Router>
  );
}

export default App;
