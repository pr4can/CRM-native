import { Action, Reducer } from "@reduxjs/toolkit";
import { Store } from "redux";
import { persistReducer, persistStore } from "redux-persist";
import { PersistPartial } from "redux-persist/es/persistReducer";
import { PersistConfig, Persistor as IPersistor } from "redux-persist/es/types";
import storage from "redux-persist/lib/storage";
import { reducersPath } from "store/index";
import userSlice from "store/slices/userSlice";

const rootName = "root";

/**
 * CONFIGS
 **/

type Config<S = any> = Partial<Omit<PersistConfig<S>, "key">>;

const rootPersistConfig = ({ blacklist, ...config }: Config = {}) => ({
	key: rootName,
	storage,
	blacklist: [...(blacklist ?? []), userSlice.name],
	...config,
});

const userPersistConfig = (config: Config<ReturnType<typeof userSlice.reducer>> = {}) => ({
	key: userSlice.name,
	storage,
	...config,
});

/**
 * REDUCERS
 **/

const reducers = {
	[userSlice.name]: persistReducer(userPersistConfig(), userSlice.reducer),
};

// todo: refactor `reducersPath`
const getPersistedReducer = <S, A extends Action>(reducer: Reducer<S, A>): Reducer<S & PersistPartial, A> =>
	persistReducer(rootPersistConfig({ blacklist: reducersPath }), reducer);

/**
 * UTILS
 **/

const clearStorage =
	({ pause, persist, purge, flush }: IPersistor) =>
	async () => {
		pause();
		await flush();
		await purge();
		persist();
	};

const utils = {
	clearStorage,
};

type Utils = { [K in keyof typeof utils]: ReturnType<(typeof utils)[K]> };

/**
 * PERSISTOR
 **/

type Persistor = IPersistor & {
	utils: Utils;
};

const getPersistor = (store: Store): Persistor => {
	const defaultPersistor = persistStore(store);

	const calledUtils: Utils = Object.fromEntries(
		Object.entries(utils).map(([name, util]) => [name, util(defaultPersistor)])
	) as Utils;

	return {
		...defaultPersistor,
		utils: calledUtils,
	};
};

const persist = { utils, reducers, getPersistedReducer, getPersistor };
export default persist;
