import {
	EntityProductCategory,
	EntityProductCategoryResponse,
	EntityProductCategoryTable,
} from "types/models/EntityProductCategory";

export const productCategoriesSerializer = (data?: EntityProductCategoryResponse): EntityProductCategoryTable[] => {
	return data
		? data.productCategories.map((element: EntityProductCategory, index: number) => ({
				...element,
				key: index,
		  }))
		: [];
};
