import { FetchBaseQueryMeta } from "@reduxjs/toolkit/query";
import { apiPath } from "config/api";
import { FileResponse } from "types/File";
import {
	GetAdminPageContentRequest,
	GetAdminPageContentResponse,
	GetAdminRequestsByClientRequest,
	GetAdvancedFinalRequestAdminPageContentResponse,
	GetClientPageContentRequest,
	GetClientPageContentResponse,
	GetExtendedReportRequest,
	GetFinalRequestAdminPageContentResponse,
	GetReportRequest,
	PostSubmitClientRequestData,
	PutUpdateClientRequestData,
} from "types/models/EntityRequest";
import fileHelper from "utils/fileHelper";
import { baseApi } from "./baseService";

export const requestsServices = baseApi.injectEndpoints({
	endpoints: (builder) => ({
		getClientPageContent: builder.query<GetClientPageContentResponse, GetClientPageContentRequest>({
			query: (params) => ({
				url: `${apiPath.Requests}/ClientPageContent`,
				params,
			}),
			providesTags: ["ClientPageContent"],
		}),
		getAdminRequestsByClient: builder.query<GetClientPageContentResponse, GetAdminRequestsByClientRequest>({
			query: (params) => ({
				url: `${apiPath.Requests}/AdminRequests`,
				params,
			}),
			providesTags: ["ClientPageContentByClient"],
		}),
		submitClientRequest: builder.mutation<void, PostSubmitClientRequestData>({
			query: (body) => ({
				url: `${apiPath.Requests}/SubmitClientRequest`,
				method: "POST",
				body,
			}),
			invalidatesTags: ["ClientPageContent"],
		}),
		updateClientRequest: builder.mutation<void, PutUpdateClientRequestData>({
			query: (body) => ({
				url: `${apiPath.Requests}/UpdateClientRequest`,
				method: "PUT",
				body,
			}),
			invalidatesTags: ["ClientPageContentByClient"],
		}),
		getAdminPageContent: builder.query<GetAdminPageContentResponse, GetAdminPageContentRequest>({
			query: (params) => ({
				url: `${apiPath.Requests}/AdminPageContent`,
				params,
			}),
			providesTags: ["AdminPageContent"],
		}),
		getFinalRequestAdminPageContent: builder.query<GetFinalRequestAdminPageContentResponse, GetAdminPageContentRequest>(
			{
				query: (params) => ({
					url: `${apiPath.Requests}/FinalRequestAdminPageContent`,
					params,
				}),
				providesTags: ["FinalRequestAdminPageContent"],
			}
		),
		getAdvancedFinalRequestAdminPageContent: builder.query<
			GetAdvancedFinalRequestAdminPageContentResponse,
			GetAdminPageContentRequest
		>({
			query: (params) => ({
				url: `${apiPath.Requests}/AdvancedFinalRequestAdminPageContent`,
				params,
			}),
			providesTags: ["AdvancedFinalRequestAdminPageContent"],
		}),
		getReport: builder.mutation<FileResponse, GetReportRequest>({
			query: (body) => ({
				url: `${apiPath.Requests}/Report`,
				method: "POST",
				body,
				responseHandler: (res) => res.blob(),
			}),
			transformResponse: async (file: Blob, meta: FetchBaseQueryMeta): Promise<FileResponse> => ({
				file,
				fileName: fileHelper.getFileNameFromMeta(meta),
			}),
		}),
		getExtendedReport: builder.query<FileResponse, GetExtendedReportRequest>({
			query: (params) => ({
				url: `${apiPath.Requests}/ExtendedReport`,
				params,
				responseHandler: (res) => res.blob(),
			}),
			transformResponse: async (file: Blob, meta: FetchBaseQueryMeta): Promise<FileResponse> => ({
				file,
				fileName: fileHelper.getFileNameFromMeta(meta),
			}),
		}),
		createAdminRequest: builder.mutation<void, number>({
			query: (date) => ({
				url: `${apiPath.Requests}/CreateAdminRequest`,
				body: { deliveryDate: date },
				method: "POST",
			}),
			invalidatesTags: ["AdminPageContent", "FinalRequestAdminPageContent"],
		}),
		deleteAdminRequest: builder.mutation<void, string>({
			query: (date) => ({
				url: `${apiPath.Requests}/DeleteAdminRequest`,
				params: { requestDeliveryDate: date },
				method: "DELETE",
			}),
			invalidatesTags: ["AdminPageContent", "FinalRequestAdminPageContent"],
		}),
		deleteClientRequest: builder.mutation<void, string>({
			query: (date) => ({
				url: `${apiPath.Requests}/DeleteClientRequest`,
				params: { requestDeliveryDate: date },
				method: "DELETE",
			}),
			invalidatesTags: ["ClientPageContent"],
		}),
	}),
	overrideExisting: true,
});

export const {
	useGetClientPageContentQuery,
	useSubmitClientRequestMutation,
	useGetAdminPageContentQuery,
	useGetFinalRequestAdminPageContentQuery,
	useGetAdvancedFinalRequestAdminPageContentQuery,
	useGetAdminRequestsByClientQuery,
	useGetReportMutation,
	useLazyGetExtendedReportQuery,
	useUpdateClientRequestMutation,
	useCreateAdminRequestMutation,
	useDeleteAdminRequestMutation,
	useDeleteClientRequestMutation,
} = requestsServices;
