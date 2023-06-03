export const versionApi = process.env.REACT_APP_API_VERSION;
export const baseUrl = `${process.env.REACT_APP_API_SERVER}/${versionApi}`;

export const apiPath = {
	Authorizations: "Authorizations",
	Measurements: "Measurements",
	ProductCategories: "ProductCategories",
	Products: "Products",
	Requests: "Requests",
	StructuralSubdivisionCategories: "StructuralSubdivisionCategories",
	Users: "Users",
};
