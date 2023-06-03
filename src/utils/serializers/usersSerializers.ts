import { EntityUser, EntityUserResponse, EntityUserTable } from "types/models/EntityUser";

export const usersSerializer = (data?: EntityUserResponse): EntityUserTable[] => {
	return data
		? data.users.map((element: EntityUser, index: number) => ({
				...element,
				key: index,
		  }))
		: [];
};
