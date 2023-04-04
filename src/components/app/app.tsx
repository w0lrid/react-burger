import React, {useEffect, useState} from 'react';
import {ingredientsURL} from "../../config/constants";
import styles from './app.module.css';
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";

function App() {
    const [ingredients, setIngredients] = useState(null)

    useEffect(() => {
        const fetchData = () => fetch(ingredientsURL)
            .then((response) => response.json())
            .catch((error) => console.error(error));

        fetchData().then(({data}) => setIngredients(data));
    }, [])
    return (
        <div className={styles.app}>
            <AppHeader/>
            <main className={styles.main}>
                <h2 className={`${styles.mainTitle} text text_type_main-large pb-5`}>Соберите бургер</h2>
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
