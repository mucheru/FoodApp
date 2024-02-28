import logo from './logo.svg';
import './App.css';
import Meals from "./components/Meals/Meals";
import { useState } from 'react';
import Cart from "./components/Cart/Cart";
import Header from "./components/Layout/Header";

const  App=()=> {
  const [showCart, setShowCart] = useState(false);

  const showCartHandler = ()=>{
    setShowCart(true)
  }
  const hideCartHandler = ()=>{
    setShowCart(false)
  }


  return (
    <>
      {showCart && <Cart onHideCart={hideCartHandler} />}
      <Header onShowCart={showCartHandler} />



    <main>
      <Meals/>

    </main>
    
    </>
  )
 
}

export default App;
