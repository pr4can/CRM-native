import buildUrl from "utils/buildUrl";

export enum ProductCategoriesPath {
	List = "list",
	Edit = "edit/:id",
	New = "new",

	ProductCategories = "ProductCategories",
}

export const productCategoriesUrl = buildUrl(ProductCategoriesPath, {
	ProductCategories: {
		List: {},
		New: {},
		Edit: {},
	},
});
