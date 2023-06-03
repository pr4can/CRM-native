import { EntityProduct, EntityProductResponse, EntityProductTable } from "types/models/EntityProduct";

export const productsSerializer = (data?: EntityProductResponse): EntityProductTable[] => {
	return data
		? data.products.map((element: EntityProduct, index: number) => ({
				...element,
				key: index,
		  }))
		: [];
};
