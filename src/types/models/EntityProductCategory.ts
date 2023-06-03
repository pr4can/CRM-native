import { ReactNode } from "react";
import { EntityProduct } from "./EntityProduct";
import { AdvancedRequestItem } from "./EntityRequest";

export interface EntityProductCategory {
	id?: number | null;
	name?: string | null;
	products?: EntityProduct[];
}

export interface FinalRequestCategory {
	productCategory?: {
		id?: number | null;
		name?: string | null;
	};
	products: EntityProduct[];
}

export interface EntityProductCategoryResponse {
	productCategories: EntityProductCategory[] | null;
}

export interface AdvancedFinalRequestCategory {
	productCategory?: {
		id?: number | null;
		name?: string | null;
	};
	advancedRequestItems: AdvancedRequestItem[];
}

export interface EntityProductCategoryTable extends EntityProductCategory {
	key: string | number;
}

export interface RequestTableRow {
	id: EntityProduct["id"] | string;
	categoryName?: EntityProductCategory["name"];
	productName?: ReactNode;
	measurement?: EntityProduct["measurement"]["name"];
	quantity?: EntityProduct["quantity"];
	measurementMultiplicity?: EntityProduct["measurementMultiplicity"];
	isCat?: boolean;
}

export type RequestTableData = RequestTableRow[];

export interface FinalRequestTableRow extends RequestTableRow {
	provider?: EntityProduct["provider"];
	subdivisionCategory?: string;
}

export type FinalRequestTableData = FinalRequestTableRow[];

export interface AdvancedFinalRequestTableRow extends FinalRequestTableRow {
	clientName?: AdvancedRequestItem["clientName"];
	clientOrganization?: AdvancedRequestItem["clientOrganization"];
	clientId?: AdvancedRequestItem["clientId"];
}

export type AdvancedFinalRequestTableData = AdvancedFinalRequestTableRow[];
