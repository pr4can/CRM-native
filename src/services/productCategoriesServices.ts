import { apiPath } from "config/api";
import { EntityProductCategory, EntityProductCategoryResponse } from "types/models/EntityProductCategory";
import { baseApi } from "./baseService";

export const productCategoriesServices = baseApi.injectEndpoints({
	endpoints: (builder) => ({
		getAllProductCategories: builder.query<EntityProductCategoryResponse, object>({
			query: (params) => ({
				url: `${apiPath.ProductCategories}`,
				params,
			}),
			providesTags: ["ProductCategoriesServices"],
		}),
		getOneProductCategories: builder.query<EntityProductCategory, number>({
			query: (id) => ({
				url: `${apiPath.ProductCategories}/${id}`,
			}),
			providesTags: ["ProductCategoriesServices"],
		}),
		addNewProductCategories: builder.mutation<string, EntityProductCategory>({
			query: (body) => ({
				url: `${apiPath.ProductCategories}`,
				method: "POST",
				body,
			}),
			invalidatesTags: ["ProductCategoriesServices"],
		}),
		deleteProductCategories: builder.mutation<string, number>({
			query: (id) => ({
				url: `${apiPath.ProductCategories}/${id}`,
				method: "DELETE",
			}),
			invalidatesTags: ["ProductCategoriesServices"],
		}),
		updateProductCategories: builder.mutation<string, EntityProductCategory>({
			query: (body) => ({
				url: `${apiPath.ProductCategories}/${body.id}`,
				method: "PUT",
				body,
			}),
			invalidatesTags: ["ProductCategoriesServices"],
		}),
	}),
	overrideExisting: true,
});

export const {
	useAddNewProductCategoriesMutation,
	useDeleteProductCategoriesMutation,
	useGetAllProductCategoriesQuery,
	useGetOneProductCategoriesQuery,
	useUpdateProductCategoriesMutation,
} = productCategoriesServices;
