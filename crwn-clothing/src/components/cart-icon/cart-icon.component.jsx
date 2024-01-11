import { useContext } from "react";

import { CartContext } from "../../contexts/cart.context";

import { ShoppingIcon, CartIconContainer, ItemCount } from "./cart-icon.styles";

const CartIcon = () => {

    const { isCartOpen, setIsCartOpen, totalCartItems } = useContext(CartContext);

    return (
        <CartIconContainer
        onClick={() => setIsCartOpen(!isCartOpen)}
        >
            <ShoppingIcon />
            <ItemCount>{totalCartItems}</ItemCount>
        </CartIconContainer>
    )
}

export default CartIcon;