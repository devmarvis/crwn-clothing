import { Outlet } from "react-router-dom";

import "./shop.styles.scss"

const Shop = () => {
    

    return (
        <div className='shop-container'>
            <Outlet />
        </div>
    );
}

export default Shop;