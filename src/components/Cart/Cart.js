import Modal from "../UI/Modal.tsx";
import CartItem from "./CartItem";
import classes from "./Cart.module.scss";
import IMeal from "../../types/Meal.ts";
import { useAppDispatch, useAppSelector } from "../../app/hooks.ts";
import { addMeal, removeMeal, emptyCart } from "../../app/mealSlice.ts";
import { useDispatch } from "react-redux";

const Cart = (props)=>{
    const dispatch = useAppDispatch();
    const mealState = useAppSelector((state)=>state.meals);
    const meals = mealState.meals;
    const hasMeals = meals.length >0;
    const totalAmount = `$${mealState.totalAmount.toFixed(2)}`;
    const cartItemAddHander = (meal)=>{
        dispatch(addMeal({...meal,amount:1}));

    };

    const cartItemRemoveHandler= (id)=>{
        dispatch(removeMeal(id));
    }

    const cartItemEmptyHandler=()=>{
        dispatch(emptyCart());
    }

    const cartItems = (
        <ul className={classes["cart-items"]}>
            {meals.map((item)=>{
                return (
                    <CartItem

                    key={item.id}
                    item={item}
                    onAdd={cartItemAddHander.bind(null,item)}
                    onRemove= {cartItemRemoveHandler.bind(null,item.id)}
                    
                    />
                )
            })}

        </ul>
    )

    return(
        <Modal onClose={props.onHideCart}>
        {!hasMeals && (
          <p className={classes["no-items"]}>No meals in your cart</p>
        )}
        {cartItems}
        <div className={classes.total}>
          <span>Total Amount</span>
          <span>{totalAmount}</span>
        </div>
        <div className={classes.actions}>
          <button className={classes["button--alt"]} onClick={props.onHideCart}>
            Close
          </button>
          {hasMeals && (
            <button
              className={classes["button--empty"]}
              onClick={cartItemEmptyHandler}
            >
              Empty Cart
            </button>
          )}
          {hasMeals && (
            <button className={classes.button} onClick={props.onHideCart}>
              Order
            </button>
          )}
        </div>
      </Modal>
    );
}
export default Cart;