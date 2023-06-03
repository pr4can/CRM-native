import { apiPath } from "config/api";
import {
	EntityStructuralSubDivisionCategory,
	EntityStructuralSubDivisionCategoryResponse,
} from "types/models/EntityStructuralSubDivisionCategory";
import { baseApi } from "./baseService";

// SSDC = StructuralSubDivisionCategories
export const structuralSubDivisionCategoriesServices = baseApi.injectEndpoints({
	endpoints: (builder) => ({
		getAllSSDC: builder.query<EntityStructuralSubDivisionCategoryResponse, object>({
			query: (params) => ({
				url: `${apiPath.StructuralSubdivisionCategories}`,
				params,
			}),
			providesTags: ["StructuralSubDivisionCategoriesServices"],
		}),
		getOneSSDC: builder.query<EntityStructuralSubDivisionCategory, number>({
			query: (id) => ({
				url: `${apiPath.StructuralSubdivisionCategories}/${id}`,
			}),
			providesTags: ["StructuralSubDivisionCategoriesServices"],
		}),
		addNewSSDC: builder.mutation<string, EntityStructuralSubDivisionCategory>({
			query: (body) => ({
				url: `${apiPath.StructuralSubdivisionCategories}`,
				method: "POST",
				body,
			}),
			invalidatesTags: ["StructuralSubDivisionCategoriesServices"],
		}),
		deleteSSDC: builder.mutation<string, number>({
			query: (id) => ({
				url: `${apiPath.StructuralSubdivisionCategories}/${id}`,
				method: "DELETE",
			}),
			invalidatesTags: ["StructuralSubDivisionCategoriesServices"],
		}),
		updateSSDC: builder.mutation<string, EntityStructuralSubDivisionCategory>({
			query: (body) => ({
				url: `${apiPath.StructuralSubdivisionCategories}/${body.id}`,
				method: "PUT",
				body,
			}),
			invalidatesTags: ["StructuralSubDivisionCategoriesServices"],
		}),
	}),
	overrideExisting: true,
});

export const {
	useAddNewSSDCMutation,
	useDeleteSSDCMutation,
	useGetAllSSDCQuery,
	useGetOneSSDCQuery,
	useUpdateSSDCMutation,
} = structuralSubDivisionCategoriesServices;
