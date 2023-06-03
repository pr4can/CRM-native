export interface EntityStructuralSubDivisionCategory {
	id?: number | null;
	name: string | null;
}

export interface EntityStructuralSubDivisionCategoryResponse {
	structuralSubdivisions: EntityStructuralSubDivisionCategory[] | null;
}

export interface EntityStructuralSubDivisionCategoryTable extends EntityStructuralSubDivisionCategory {
	key: string | number;
}
