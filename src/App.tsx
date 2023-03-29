import React from 'react';
import './App.css';
import AppHeader from "./components/app-header/app-header";
import BurgerIngredients from "./components/burger-ingredients/burger-ingredients";
import BurgerConstructor from "./components/burger-constructor/burger-constructor";

function App() {
  return (
    <div className="App">
        <AppHeader />
        <main className="main">
            <h2 className="main-title text text_type_main-large pb-5">Соберите бургер</h2>
            <BurgerIngredients />
            <BurgerConstructor />
        </main>
    </div>
  );
}

export default App;
