import buildUrl from "utils/buildUrl";

export enum RequestsPath {
	List = "list",
	FinalList = "FinalList",
	AdvancedFinalList = "AdvancedFinalList",

	EditByDate = "edit/:id/",
	New = "new",

	Requests = "Requests",
	RequestsAdmin = "RequestsAdmin",
}

export const requestsUrl = buildUrl(RequestsPath, {
	Requests: {
		List: {},
	},
	RequestsAdmin: {
		List: {},
		FinalList: {},
		AdvancedFinalList: {},
		EditByDate: {},
	},
});
