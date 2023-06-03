import { createListenerMiddleware, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { persistor } from "store/index";
import { EntityUser } from "types/models/EntityUser";

export interface AuthState {
	user?: EntityUser;
	token: string;
	isAuth: boolean;
}

interface PayloadUser {
	user: EntityUser;
	token: string;
}

const initialState: AuthState = {
	user: undefined,
	token: "",
	isAuth: false,
};

const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		login: (state, action: PayloadAction<PayloadUser>) => {
			state.user = action.payload.user;
			state.token = action.payload.token;
			state.isAuth = true;
		},
		setToken: (state, action: PayloadAction<string>) => {
			state.token = action.payload;
			state.isAuth = true;
		},
		setUser: (state, action: PayloadAction<EntityUser>) => {
			state.user = action.payload;
			state.isAuth = true;
		},
		logout: (state) => {
			state.user = undefined;
			state.token = "";
			state.isAuth = false;
		},
	},
});

export const { login, logout, setToken, setUser } = userSlice.actions;

export const userListener = createListenerMiddleware();

userListener.startListening({
	actionCreator: userSlice.actions.logout,
	effect: async (action, listenerApi) => {
		await persistor.utils.clearStorage();
	},
});

export default userSlice;
