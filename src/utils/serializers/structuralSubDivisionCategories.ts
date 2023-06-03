import {
	EntityStructuralSubDivisionCategory,
	EntityStructuralSubDivisionCategoryResponse,
	EntityStructuralSubDivisionCategoryTable,
} from "types/models/EntityStructuralSubDivisionCategory";

export const structuralSubdivisionsSerializer = (
	data?: EntityStructuralSubDivisionCategoryResponse
): EntityStructuralSubDivisionCategoryTable[] => {
	return data
		? data.structuralSubdivisions.map((element: EntityStructuralSubDivisionCategory, index: number) => ({
				...element,
				key: index,
		  }))
		: [];
};
