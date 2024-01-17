
import CategoryPreview from '../../components/category-preview/category-preview.component';
import { useSelector } from 'react-redux';

import { selectCategoryMap, selectCategoriesIsLoading } from '../../store/category/category.selector';
import Spinner from '../../components/spinner/spinner.styles';



const CategoriesPreview = () => {

    const categoriesMap  = useSelector(selectCategoryMap);
    const isLoading = useSelector(selectCategoriesIsLoading);

    return (
        <div className='category-preview-container'>
            {
                isLoading ? <Spinner /> :
                Object.keys(categoriesMap).map((title) => {
                    const products = categoriesMap[title];
                    return (
                        <CategoryPreview key={title} title={title} products={products} />
                    );
                })
            }
        </div>
    );
}

export default CategoriesPreview;