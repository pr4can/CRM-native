import { apiPath } from "config/api";
import { EntityUser, EntityUserResponse } from "types/models/EntityUser";
import { baseApi } from "./baseService";

export const usersService = baseApi.injectEndpoints({
	endpoints: (builder) => ({
		getUserByToken: builder.query<EntityUser, string>({
			query: (token) => ({
				url: `${apiPath.Users}/Profile`,
				headers: {
					Authorization: token,
				},
			}),
			providesTags: ["Users"],
		}),
		getAllUsers: builder.query<EntityUserResponse, object>({
			query: (params) => ({
				url: `${apiPath.Users}`,
				params,
			}),
			providesTags: ["Users"],
		}),
		getOneUsers: builder.query<EntityUser, number>({
			query: (id) => ({
				url: `${apiPath.Users}/${id}`,
			}),
			providesTags: ["Users"],
		}),
		addNewUsers: builder.mutation<string, EntityUser>({
			query: (body) => ({
				url: `${apiPath.Users}`,
				method: "POST",
				body,
			}),
			invalidatesTags: ["Users"],
		}),
		deleteUsers: builder.mutation<string, number>({
			query: (id) => ({
				url: `${apiPath.Users}/${id}`,
				method: "DELETE",
			}),
			invalidatesTags: ["Users"],
		}),
		updateUsers: builder.mutation<string, EntityUser>({
			query: (body) => ({
				url: `${apiPath.Users}/${body.id}`,
				method: "PUT",
				body,
			}),
			invalidatesTags: ["Users"],
		}),
	}),
	overrideExisting: true,
});

export const {
	useGetUserByTokenQuery,
	useAddNewUsersMutation,
	useDeleteUsersMutation,
	useGetAllUsersQuery,
	useGetOneUsersQuery,
	useUpdateUsersMutation,
} = usersService;
