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

export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => null,
    cartItems: [],
    addItemToCart: () => {}
});



export const CartProvider = ({ children }) => {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [totalCartItems, setTotalCartItems] = useState(0);

    useEffect(() => {
        const newTotalCartItems = cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0)
        setTotalCartItems(newTotalCartItems);
    }, [cartItems])

    const addItemToCart = (productToAdd) => {
        setCartItems(addCartItem(cartItems, productToAdd));
        console.log(cartItems)
    }

    const value = { isCartOpen, setIsCartOpen, addItemToCart, cartItems, totalCartItems };

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
}