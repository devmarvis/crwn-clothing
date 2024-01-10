import { createContext, useEffect, useState } from "react";


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

export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => null,
    cartItems: [],
    totalCartItems: 0,
    cartTotalCost: 0,
    addItemToCart: () => {},
    incrementCartItemQty: () => {},
    decrementCartItemQty: () => {},
    deleteItemFromCart: () => {},
});



export const CartProvider = ({ children }) => {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [totalCartItems, setTotalCartItems] = useState(0);
    const [cartTotalCost, setCartTotalCost] = useState(0);

    useEffect(() => {
        const newTotalCartItems = cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0)
        setTotalCartItems(newTotalCartItems);

    }, [cartItems]);

    useEffect(() => {
        const newTotalCartCost = cartItems.reduce((total, cartItem) => total + (cartItem.quantity * cartItem.price), 0);
        ;
        setCartTotalCost(newTotalCartCost)
    }, [cartItems])

    const addItemToCart = (productToAdd) => {
        setCartItems(addCartItem(cartItems, productToAdd));
    }

    const incrementCartItemQty = (productToIncrement) => {
        setCartItems(incrementItemQty(cartItems, productToIncrement));
    }

    const decrementCartItemQty = (productToDecrement) => {
        setCartItems(decrementItemQty(cartItems, productToDecrement));
    }

    const deleteItemFromCart = (productToDelete) => {
        setCartItems(deleteCartItem(cartItems, productToDelete));;
    }


    const value = { 
        isCartOpen, 
        setIsCartOpen, 
        addItemToCart, 
        cartItems, 
        totalCartItems,
        incrementCartItemQty,
        decrementCartItemQty, 
        deleteItemFromCart,
        cartTotalCost
    };

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
}