import buildUrl from "utils/buildUrl";

export enum UsersPath {
	List = "list",
	Edit = "edit/:id",
	New = "new",

	Users = "Users",
}

export const usersUrl = buildUrl(UsersPath, {
	Users: {
		List: {},
		New: {},
		Edit: {},
	},
});
