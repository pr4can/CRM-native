import { EntityMeasurement } from "./EntityMeasurement";
import { EntityProductCategory } from "./EntityProductCategory";
import { EntityStructuralSubDivisionCategory } from "./EntityStructuralSubDivisionCategory";

export interface EntityProduct {
	id?: number | null;
	name: string | null;
	provider: string | null;
	measurementId?: number | null;
	measurement?: EntityMeasurement | null;
	measurementMultiplicity?: number | null;
	categoryId?: number | null;
	productCategory?: EntityProductCategory | null;
	structuralSubdivisionCategoryId?: number | null;
	structuralSubdivisionCategoryIds?: number[] | null;
	structuralSubdivisionCategory?: EntityStructuralSubDivisionCategory | null;
	quantity?: number;
	structuralSubdivision?: string;
}

export interface EntityProductForAdvanced extends Omit<EntityProduct, "measurement"> {
	measurement?: EntityMeasurement;
}

export interface EntityProductResponse {
	products: EntityProduct[] | null;
}

export interface EntityProductTable extends EntityProduct {
	key: string | number;
}
