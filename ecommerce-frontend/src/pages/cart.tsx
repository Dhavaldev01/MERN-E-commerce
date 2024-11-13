import { useEffect, useState } from "react";
import {VscError} from 'react-icons/vsc'
import CartItem from "../components/cart-item";
import { Link } from "react-router-dom";


const cartItems = [
  {
    productId : "bivsvid",
    photo:"https://m.media-amazon.com/images/I/71jG+e7roXL._SX679_.jpg",
    name:"MackBook",
    price:3000,
    quantinty:4,
    stock:10      
  }
];
const subtotal = 4000;
const tax = Math.round(subtotal * 0.18);
const shippingCharges = 200 ;
const discount = 400;
const total  = subtotal + tax + shippingCharges;

const cart = () => {

  const [couponCode, setCouponCode] = useState<string>("");
  const [isvalidCouponCode , setisValidCouponCode ] = useState<boolean>(false);

  useEffect(()=> {
    const timeOutId = setTimeout(()=>{
      if(Math.random() > 0.5 ) setisValidCouponCode(true);
      else setisValidCouponCode(false)
      
    },1000);

    return () => {
      clearTimeout(timeOutId);
      setisValidCouponCode(false);
    }
  }
  ,[couponCode]
);

  return (
    <div className="cart">
        <main>
          {
            cartItems.length > 0 ?  cartItems.map((i , index)=> (
            <CartItem key = {index} cartItem={i}/>))
            : <h1>No Items Added</h1>
          }
        </main>
        <aside>
            <p>Subtotal : ₹{subtotal}</p>
            <p>Shipping Charges : ₹{shippingCharges}</p>
            <p>Tex : ₹{tax}</p>
            <p>
                Discount: <em className="red"> - ₹{discount}</em>
            </p>
            <p><b>Total : ₹{total}</b></p>
            <input 
            type="text" 
            placeholder="Coupon Code"
            value={couponCode} 
            onChange={(e) => setCouponCode(e.target.value)}/>
            {
              couponCode && 
              (isvalidCouponCode ? 
                <span className="green">
                  ₹{discount} off using the <code>{couponCode}</code>
                  </span>
                : <span className="red">Invalid Coupon <VscError/></span>)
            }
            {
              cartItems.length > 0 && <Link to="/shipping" >Checkout</Link>
            }
        </aside>
    </div>
  )
}

export default cart