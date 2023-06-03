import { EntityProduct } from "types/models/EntityProduct";
import {
	AdvancedFinalRequestCategory,
	AdvancedFinalRequestTableData,
	EntityProductCategory,
	FinalRequestCategory,
	FinalRequestTableData,
	RequestTableData,
	RequestTableRow,
} from "types/models/EntityProductCategory";

const transformCategoriesToRequestTableData = (data: EntityProductCategory[]): RequestTableData => {
	const productList: (EntityProduct & { categoryName: string })[] = data
		?.reduce((result, cat) => {
			return [
				...result,
				...cat.products?.map((product) => ({
					...product,
					categoryName: cat.name,
				})),
			];
		}, [])
		.flat();

	return (
		productList?.map(({ id, categoryName, quantity, measurement, name, measurementMultiplicity }, index) => ({
			id,
			key: id,
			categoryName: index === 0 || categoryName !== productList[index - 1].categoryName ? categoryName : "",
			measurement: measurement.name ?? measurement?.toString(),
			quantity: quantity,
			productName: name,
			measurementMultiplicity,
		})) ?? []
	);
};

export const transformCategoriesToRequestMobileTableData = (data: EntityProductCategory[] = []): RequestTableData => {
	return data?.reduce<RequestTableData>((result, category) => {
		const cat: RequestTableRow & { key: string } = {
			key: `category-${category.id}`,
			id: `category-${category.id}`,
			categoryName: null,
			measurement: null,
			quantity: null,
			productName: <b>{category.name}</b>,
			measurementMultiplicity: null,
			isCat: true,
		};

		const products =
			category?.products?.map(({ id, quantity, measurement, name, measurementMultiplicity }) => ({
				id,
				key: id,
				measurement: measurement.name ?? measurement?.toString(),
				quantity: quantity,
				productName: name,
				measurementMultiplicity,
			})) ?? [];

		return products.length ? [...result, ...[cat, ...products]] : result;
	}, []);
};

export const transformFinalCategoriesToRequestTableData = (data: FinalRequestCategory[]): FinalRequestTableData => {
	const productList: (EntityProduct & { categoryName: string })[] = data
		?.reduce((result, cat) => {
			return [
				...result,
				// todo: fix types
				...cat.products?.map(({ product, totalQuantity }: any) => ({
					...product,
					quantity: totalQuantity,
					categoryName: cat?.productCategory?.name,
				})),
			];
		}, [])
		.flat();

	return (
		productList?.map(
			(
				{
					id,
					categoryName,
					quantity,
					structuralSubdivisionCategory,
					measurement,
					name,
					measurementMultiplicity,
					provider,
				},
				index
			) => ({
				id,
				key: id,
				categoryName: index === 0 || categoryName !== productList[index - 1].categoryName ? categoryName : "",
				measurement: measurement?.name,
				quantity,
				productName: name,
				measurementMultiplicity,
				provider,
				subdivisionCategory: structuralSubdivisionCategory?.name,
			})
		) ?? []
	);
};

export const transformAdvancedFinalCategoriesToRequestTableData = (
	data: AdvancedFinalRequestCategory[]
): AdvancedFinalRequestTableData => {
	const productList: (EntityProduct & { categoryName: string; clientOrganization: string; clientId: number })[] = data
		?.reduce((result, cat) => {
			return [
				...result,
				...cat.advancedRequestItems?.map(({ product, clientId, ...other }) => ({
					key: `${cat.productCategory.id}-${clientId}-${product.id}`,
					...other,
					...product,
					clientId,
					categoryName: cat?.productCategory?.name,
				})),
			];
		}, [])
		.flat();

	return (
		productList?.map(
			(
				{
					id,
					categoryName,
					quantity,
					structuralSubdivisionCategory,
					measurement,
					name,
					measurementMultiplicity,
					provider,
					clientOrganization,
					clientId,
				},
				index
			) => ({
				id,
				key: `${clientId}-${id}`,
				categoryName: index === 0 || categoryName !== productList[index - 1].categoryName ? categoryName : "",
				measurement: measurement.name,
				quantity,
				productName: name,
				measurementMultiplicity,
				provider,
				clientOrganization: index === 0 || clientId !== productList[index - 1].clientId ? clientOrganization : "",
				subdivisionCategory: structuralSubdivisionCategory?.name,
			})
		) ?? []
	);
};

export default transformCategoriesToRequestTableData;
