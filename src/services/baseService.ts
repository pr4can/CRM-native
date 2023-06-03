import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { baseUrl } from "config/api";
import { RootState } from "store";
import { ContentType } from "types/service";

export const baseApi = createApi({
	reducerPath: "baseApi",
	baseQuery: fetchBaseQuery({
		baseUrl,
		prepareHeaders: (headers, { getState }) => {
			headers.set("Content-Type", ContentType.Json);
			const token = (getState() as RootState).user.token;
			return token ? headers.set("Authorization", token) : headers;
		},
	}),
	refetchOnMountOrArgChange: true,
	tagTypes: [
		"Users",
		"StructuralSubDivisionCategoriesServices",
		"ProductCategoriesServices",
		"Products",
		"Measurements",
		"Requests",
		"ClientPageContent",
		"ClientPageContentByClient",
		"AdminPageContent",
		"FinalRequestAdminPageContent",
		"AdvancedFinalRequestAdminPageContent",
	],
	endpoints: () => ({}),
});
