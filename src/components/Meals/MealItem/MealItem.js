import { useDebugValue } from "react";
import { useAppDispatch } from "../../../app/hooks.ts";
import { addMeal } from "../../../app/mealSlice.ts";
import classes from "./MealItem.module.scss";
import MealItemForm from "./MealItemForm";
import { useDispatch } from "react-redux";

const MealItem = (props)=>{

    const dispatch = useDispatch();
    const meal = props.item;
    //const price = props.price;
    //const name = props.name

    const addToCartHandler = (amount)=>{

        const newMeal = {
            ...meal,
            amount:amount
        }
        dispatch(addMeal(newMeal))

    }

    return (
        <li className={classes.meal}>
             <div>
        <h3>{meal.name}</h3>
        <div className={classes.description}>{meal.description}</div>
        <div className={classes.price}>{meal.price}</div>
      </div>
      <div><MealItemForm onAddToCart={addToCartHandler}/></div>

        </li>
    )

}
export default MealItem;