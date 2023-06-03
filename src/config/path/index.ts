import buildUrl from "utils/buildUrl";
import { LoginPath, loginUrl } from "./loginPaths";
import { MeasurementsPath, measurementsUrl } from "./measurementsPaths";
import { ProductCategoriesPath, productCategoriesUrl } from "./productCategoriesPaths";
import { ProductsPath, productsUrl } from "./productsPaths";
import { RequestsPath, requestsUrl } from "./requestsPaths";
import {
	StructuralSubDivisionCategoriesPath,
	structuralSubDivisionCategoriesUrl,
} from "./structuralSubdivisionCategoriesPaths";
import { UsersPath, usersUrl } from "./usersPaths";

enum GeneralPath {
	Index = "",
	NotFound = "/404",
	All = "*",
}

export type PublicPath = LoginPath | GeneralPath;
export type AuthorizedPath =
	| GeneralPath
	| RequestsPath
	| MeasurementsPath
	| ProductCategoriesPath
	| ProductsPath
	| StructuralSubDivisionCategoriesPath
	| UsersPath;

const rowUrl = buildUrl(GeneralPath, {
	Index: {},
	NotFound: {},
	All: {},
});

export const publicUrl = {
	...rowUrl,
	Index: {
		...rowUrl.Index,
		...loginUrl,
	},
};

export const authUrl = {
	...rowUrl,
	Index: {
		...rowUrl.Index,
		...requestsUrl,
		...measurementsUrl,
		...productCategoriesUrl,
		...productsUrl,
		...structuralSubDivisionCategoriesUrl,
		...usersUrl,
	},
};
