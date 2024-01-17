import { createAction } from "../../utils/reducer/reducer.utils";
import { CART_ACTION_TYPES } from "./cart.types";


const addCartItem = (cartItems, productToAdd) => {
    //find if cartItems contains productToAdd
    const { id } = productToAdd;
    const existingCartItem = cartItems.find(item => item.id === id);
    
    //if found, increment quantity
    if(existingCartItem){
        return cartItems.map(item => item.id === id ? {...item, quantity: item.quantity + 1} : item);
    }

    //return new array with modified cartItems/ new cart Item
    return [...cartItems, {...productToAdd, quantity: 1}];
};

const incrementItemQty = (cartItems, productToIncrement) => {
    //get the particular item
    const { id } = productToIncrement;
    return cartItems.map(item => item.id === id ? {...item, quantity: item.quantity + 1 } : item);
} 

const decrementItemQty = (cartItems, productToDecrement) => {
    //get the particular item
    const { id, quantity } = productToDecrement;
    if(quantity === 1){
        return cartItems.filter(item => item.id !== id);
    }
    return cartItems.map(item => item.id === id ? {...item, quantity: item.quantity - 1} : item);
}

const deleteCartItem  = (cartItems, productToDelete) => {
    //get the particular item
    const { id } = productToDelete;
    return cartItems.filter(item => item.id !== id);
} 


export const toggleCart = (boolean) => createAction(CART_ACTION_TYPES.TOGGLE_CART, boolean);


export const addItemToCart = (cartItems, productToAdd) => {
    const newCartItems = addCartItem(cartItems, productToAdd)
    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems)
}

export const incrementCartItemQty = (cartItems, productToIncrement) => {
    const newCartItems = incrementItemQty(cartItems, productToIncrement)
    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems)
}

export const decrementCartItemQty = (cartItems, productToDecrement) => {
    const newCartItems = decrementItemQty(cartItems, productToDecrement)
    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems)
}

export const deleteItemFromCart = (cartItems, productToDelete) => {
    const newCartItems = deleteCartItem(cartItems, productToDelete)
    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems)
}