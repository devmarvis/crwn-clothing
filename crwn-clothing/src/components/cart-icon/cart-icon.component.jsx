import { useContext } from "react";

import { ShoppingIcon, CartIconContainer, ItemCount } from "./cart-icon.styles";
import { useDispatch, useSelector } from "react-redux";
import { selectCartCount, selectCartTotal, selectToggleCart } from "../../store/cart/cart.selector";
import { toggleCart } from "../../store/cart/cart.action";

const CartIcon = () => {

    const dispatch  = useDispatch();
    
    const isCartOpen = useSelector(selectToggleCart);
    const totalCartItems = useSelector(selectCartCount);


    return (
        <CartIconContainer
        onClick={() => dispatch(toggleCart(!isCartOpen))}
        >
            <ShoppingIcon />
            <ItemCount>{totalCartItems}</ItemCount>
        </CartIconContainer>
    )
}

export default CartIcon;