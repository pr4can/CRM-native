import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE } from "redux-persist";
import { services } from "services";
import errorHandler from "store/middleware/errorHandler";
import syncState from "store/middleware/syncState";
import persist from "store/persist";
import { userListener } from "./slices/userSlice";

const reducers = Object.fromEntries(services.map((service) => [service.reducerPath, service.reducer]));
const middlewares = services.map((service) => service.middleware);
export const reducersPath = services.map((service) => service.reducerPath);

type TReducers = { [k in (typeof services)[number]["reducerPath"]]: (typeof services)[number]["reducer"] };

const typedReducers = reducers as TReducers;

const rootReducer = combineReducers({
	...typedReducers,
	...persist.reducers,
});

const persistedReducer = persist.getPersistedReducer(rootReducer);

const store = configureStore({
	reducer: persistedReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
			},
		})
			.prepend(userListener.middleware)
			.concat(middlewares)
			.concat(errorHandler)
			.concat(syncState),
});

export const persistor = persist.getPersistor(store);

export default store;

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
