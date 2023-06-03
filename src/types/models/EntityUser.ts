import { EntityStructuralSubDivisionCategory } from "./EntityStructuralSubDivisionCategory";

export enum UserRole {
	SimpleUser = 0,
	Admin = 1,
}

export type UserAcceptRole = "All";

export interface EntityUser {
	id?: number | null;
	name: string | null;
	password: string | null;
	phone: string | null;
	organization: string | null;
	address: string | null;
	structuralSubdivisionCategoryId?: number | null;
	structuralSubdivisionCategory?: EntityStructuralSubDivisionCategory | null;
	role: UserRole | null;
}

export interface EntityUserResponse {
	users: EntityUser[] | null;
}

export interface EntityUserLogin {
	phone: string;
	password: string;
}

export interface EntityUserLoginResponse {
	isSuccess: boolean | null;
	errorDescription: string | null;
	token?: string | null;
}

export interface EntityUserTable extends EntityUser {
	key: string | number;
}

export type GetUserTokenResponse =
	| {
			isSuccess: boolean;
			errorDescription: string;
	  }
	| {
			isSuccess: boolean;
			token: string;
	  };

export type LoginResponse = {
	user?: EntityUser;
	errorDescription?: string;
};
