import { createSelector } from "reselect";

//reselect - concept of memoized selector
//as long as the input does not change then output should always be the same
const selectCategoryReducer = (state) => state.category;

export const selectCategories = createSelector(
  [selectCategoryReducer], //array of input selector, gets passed as args in the output selector
  (categoriesSlice) => categoriesSlice.categories
  //output selector - memoized selector
);

export const selectCategoryMap = createSelector(
  [selectCategories],
  (categories) => categories.reduce((acc, category) => {
    const { title, items } = category;
    //what finally gets done in the reduce method
    acc[title.toLowerCase()] = items;
    return acc;
  }, {})

);

export const selectCategoriesIsLoading = createSelector(
  [selectCategoryReducer],
  (categoriesSlice) => categoriesSlice.isLoading
)