import { Outlet } from "react-router-dom";

import "./shop.styles.scss"
import { fetchCategoriesAsync, } from "../../store/category/category.action";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const Shop = () => {
    const dispatch = useDispatch();
    
    useEffect(() => {
            dispatch(fetchCategoriesAsync());
    }, []);


    return (
        <div className='shop-container'>
            <Outlet />
        </div>
    );
}

export default Shop;