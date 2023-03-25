import { Counter, Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import "./burger-ingredients.css";
import Ingredient from "./ingredient/ingredient";

const BurgerIngredients = () => {
  return (
    <div className="ingredients">
      <nav className="ingredients__nav">
        <Tab active={true} value="Булки" onClick={() => { console.log("Булки") }} />
        <Tab active={false} value="Соусы" onClick={() => { console.log("Соусы") }} />
        <Tab active={false} value="Начинки" onClick={() => { console.log("Начинки") }} />
      </nav>
      <section className="ingredients__section">
        <Ingredient img='img' price='20' title='Краторная булочка N-200i' />
        <Ingredient img='img' price='20' title='Флюоресцентная булка R2-D3' />
        <Ingredient img='img' price='20' title='Краторная булочка N-200i' />
        <Ingredient img='img' price='20' title='Флюоресцентная булка R2-D3' />
      </section>
      <section className="ingredients__section">
        <Ingredient img='img' price='30' title='Соус Spicy-X' />
      </section>
      <section className="ingredients__section">
        <Ingredient img='img' price='20' title='Начинка к бургеру' />
      </section>
      <Counter count="1" />
    </div>
  )
}

export default BurgerIngredients