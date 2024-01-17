import { useParams } from "react-router-dom";

import "./category.styles.jsx";
import { Fragment, useEffect, useState } from "react";

import ProductCard from "../../../components/product-card/product-card.component";

import { useSelector } from "react-redux";

import { selectCategoriesIsLoading, selectCategoryMap } from "../../../store/category/category.selector";
import Spinner from "../../../components/spinner/spinner.styles";
import { CategoryContainer, Title } from "./category.styles.jsx";

const Category = () => {
    const { category } = useParams();

    // const { categoriesMap } = useContext(CategoriesContext);
    const categoriesMap = useSelector(selectCategoryMap);
    const isLoading = useSelector(selectCategoriesIsLoading)
    
    const [products, setProducts] = useState(categoriesMap[category]);

    useEffect(() => {
        setProducts(categoriesMap[category]);
    }, [category, categoriesMap])


    return (
        <Fragment>
            <Title>{category.toUpperCase()}</Title>
            {
                isLoading ? <Spinner /> : <CategoryContainer>
                {
                    products && products.map(product => <ProductCard key={product.id} product={product} />)
                }
            </CategoryContainer>
            }
        </Fragment>
    );
}

export default Category;