import buildUrl from "utils/buildUrl";

export enum StructuralSubDivisionCategoriesPath {
	List = "list",
	Edit = "edit/:id",
	New = "new",

	StructuralSubDivisionCategories = "StructuralSubdivisionCategories",
}

export const structuralSubDivisionCategoriesUrl = buildUrl(StructuralSubDivisionCategoriesPath, {
	StructuralSubDivisionCategories: {
		List: {},
		New: {},
		Edit: {},
	},
});
