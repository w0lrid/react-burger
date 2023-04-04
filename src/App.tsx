import React, {useEffect, useState} from 'react';
import {ingredientsURL} from "./config/constants";
import './App.css';
import AppHeader from "./components/app-header/app-header";
import BurgerIngredients from "./components/burger-ingredients/burger-ingredients";
import BurgerConstructor from "./components/burger-constructor/burger-constructor";

function App() {
    const [ingredients, setIngredients] = useState(null)

    useEffect(() => {
        const fetchData = () => fetch(ingredientsURL)
            .then((response) => response.json())
            .catch((error) => console.error(error));

        fetchData().then(({data}) => setIngredients(data));
    }, [])
    return (
        <div className="App">
            <AppHeader/>
            <main className="main">
                <h2 className="main-title text text_type_main-large pb-5">Соберите бургер</h2>
                {ingredients && (
                    <>
                        <BurgerIngredients data={ingredients}/>
                        <BurgerConstructor data={ingredients}/>
                    </>
                )}
            </main>
        </div>
    );
}

export default App;
