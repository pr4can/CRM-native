import { apiPath } from "config/api";
import { login } from "store/slices/userSlice";
import { EntityUserLogin, EntityUserLoginResponse, GetUserTokenResponse, LoginResponse } from "types/models/EntityUser";
import { baseApi } from "./baseService";
import { usersService } from "./usersServices";

export const authService = baseApi.injectEndpoints({
	endpoints: (builder) => ({
		getToken: builder.mutation<EntityUserLoginResponse, EntityUserLogin>({
			query: (userData) => ({
				url: `${apiPath.Authorizations}/Login`,
				method: "POST",
				body: userData,
			}),
		}),
	}),
});

export const authServiceExpanded = authService.injectEndpoints({
	endpoints: (builder) => ({
		login: builder.query<LoginResponse, EntityUserLogin>({
			async queryFn(data, { dispatch }) {
				const userResponse: GetUserTokenResponse = await dispatch(authService.endpoints.getToken.initiate(data))
					.unwrap()
					.then((user) => user)
					.catch((error) => error.data);

				if ("token" in userResponse) {
					const authUser = await dispatch(usersService.endpoints.getUserByToken.initiate(userResponse.token))
						.unwrap()
						.then((response) => {
							dispatch(login({ user: response, token: userResponse.token }));
							return response;
						});

					return {
						data: {
							user: authUser,
							errorDescription: "",
						},
					};
				} else {
					return {
						data: {
							user: undefined,
							errorDescription: userResponse.errorDescription,
						},
					};
				}
			},
		}),
	}),
	overrideExisting: true,
});

export const { useLazyLoginQuery } = authServiceExpanded;
