import buildUrl from "utils/buildUrl";

export enum ProductsPath {
	List = "list",
	Edit = "edit/:id",
	New = "new",

	Products = "Products",
}

export const productsUrl = buildUrl(ProductsPath, {
	Products: {
		List: {},
		New: {},
		Edit: {},
	},
});
