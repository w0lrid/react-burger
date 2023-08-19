import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { BurgerConstructorPage, LoginPage } from "../../pages";

function App() {
  return (
    <Router>
      <Routes>
          <Route path="/" element={<BurgerConstructorPage />} />
          <Route path="/login" element={<LoginPage />} />
      </Routes>
    </Router>
  );
}

export default App;
