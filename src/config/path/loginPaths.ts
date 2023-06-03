import buildUrl from "utils/buildUrl";

export enum LoginPath {
	Login = "login",
}

export const loginUrl = buildUrl(LoginPath, {
	Login: {},
});
