import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";
import IMeal from "../types/Meal";
import e from "express";

interface MealState {
    meals:IMeal[];
    totalAmount:number;
}

const initialState:MealState = {
    meals:[],
    totalAmount:0
}

export const mealSlice =createSlice ({
    name:"meal",
    initialState: initialState,
    reducers:{

        //Add meal

        addMeal:(state,action:PayloadAction<IMeal>)=>{

            state.totalAmount +=action.payload.price * action.payload.amount;
            const existingCartItemIndex =state.meals.findIndex((item)=>item.id == action.payload.id);

            const existingCartItem = state.meals[existingCartItemIndex];
            if(existingCartItem){
                const updateItem = {

                    ...existingCartItem,
                    amount:existingCartItem.amount +action.payload.amount
                };

                state.meals = state.meals.map((meal)=>{
                    if(meal.id === action.payload.id) return updateItem;
                    else return meal;
                });
            }

            else {
                state.meals = state.meals.concat(action.payload)
            }

        },
        //remove meal

        removeMeal:(state,action:PayloadAction<string>)=>{
            const existingCartItemIndex = state.meals.findIndex((item)=>item.id ==action.payload);
            const existingCartItem = state.meals[existingCartItemIndex];
            state.totalAmount -=existingCartItem.price;
            if(existingCartItem.amount ===1){
                state.meals = state.meals.filter((item)=>item.id !=action.payload);
            } 
            else{

                const updateItem = {
                    ...existingCartItem,
                    amount:existingCartItem.amount -1,
                };
                state.meals = state.meals.map((meal)=>{
                    if(meal.id === action.payload) return updateItem;
                    else return meal
                });
            }

        },

        emptyCart:(state)=>{
            state.meals= [];
            state.totalAmount =0
        },
    },


});

export const { addMeal, removeMeal, emptyCart } = mealSlice.actions;
export const selectMeal = (state: RootState) => state.meals.meals.values;
export default mealSlice.reducer;
