import { apiPath } from "config/api";
import { EntityProduct, EntityProductResponse } from "types/models/EntityProduct";
import { baseApi } from "./baseService";

export const productsService = baseApi.injectEndpoints({
	endpoints: (builder) => ({
		getAllProducts: builder.query<EntityProductResponse, object>({
			query: (params) => ({
				url: `${apiPath.Products}`,
				params,
			}),
			providesTags: ["Products"],
		}),
		getOneProducts: builder.query<EntityProduct, number>({
			query: (id) => ({
				url: `${apiPath.Products}/${id}`,
			}),
			providesTags: ["Products"],
		}),
		addNewProducts: builder.mutation<string, EntityProduct>({
			query: (body) => ({
				url: `${apiPath.Products}`,
				method: "POST",
				body,
			}),
			invalidatesTags: ["Products"],
		}),
		deleteProducts: builder.mutation<string, number>({
			query: (id) => ({
				url: `${apiPath.Products}/${id}`,
				method: "DELETE",
			}),
			invalidatesTags: ["Products"],
		}),
		updateProducts: builder.mutation<string, EntityProduct>({
			query: (body) => ({
				url: `${apiPath.Products}/${body.id}`,
				method: "PUT",
				body,
			}),
			invalidatesTags: ["Products"],
		}),
	}),
	overrideExisting: true,
});

export const {
	useAddNewProductsMutation,
	useDeleteProductsMutation,
	useGetAllProductsQuery,
	useGetOneProductsQuery,
	useUpdateProductsMutation,
} = productsService;
