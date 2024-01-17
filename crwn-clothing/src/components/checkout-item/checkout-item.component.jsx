
import "./checkout-item.styles.scss";
import { decrementCartItemQty, deleteItemFromCart, incrementCartItemQty } from "../../store/cart/cart.action";
import { useDispatch, useSelector } from "react-redux";
import { selectCartItems } from "../../store/cart/cart.selector";


const CheckoutItem = ({ cartItem }) => {
    const { name, imageUrl, price, quantity} = cartItem;
    const cartItems = useSelector(selectCartItems)

    const dispatch = useDispatch()

    const incrementItemQuantity = () => dispatch(incrementCartItemQty(cartItems, cartItem));

    const decrementItemQuantity = () => dispatch(decrementCartItemQty(cartItems, cartItem));

    const deleteItem = () => dispatch(deleteItemFromCart(cartItems, cartItem));

    return (
        <div className="checkout-item-container">
            <div className="image-container">
                <img src={imageUrl} alt={`${name}`} />
            </div>
            <span className="name">{name}</span>
            <span className="quantity">
                <div
                onClick={decrementItemQuantity} 
                className="arrow">&#10094;</div>
                <span className="value">{quantity}</span>
                <div
                onClick={incrementItemQuantity} 
                className="arrow">&#10095;</div>
            </span>
            <span className="price">{price}</span>
            <div 
            className="remove-button"
            onClick={deleteItem}
            >&#10005;</div>
        </div>
    );
}

export default CheckoutItem;