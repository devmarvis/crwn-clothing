
import { useContext } from "react";
import "./checkout-item.styles.scss";
import { CartContext } from "../../contexts/cart.context";

const CheckoutItem = ({ cartItem }) => {
    const { name, imageUrl, price, quantity} = cartItem;

    const { 
        incrementCartItemQty, 
        decrementCartItemQty, 
        deleteItemFromCart,
    } = useContext(CartContext);

    const incrementItemQuantity = () => incrementCartItemQty(cartItem);

    const decrementItemQuantity = () => decrementCartItemQty(cartItem);

    const deleteItem = () => deleteItemFromCart(cartItem);

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