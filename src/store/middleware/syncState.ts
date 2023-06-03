import { PERSIST, PURGE } from "redux-persist";
import { Config, createStateSyncMiddleware } from "redux-state-sync";

const config: Config = {
	blacklist: [PERSIST, PURGE],
	broadcastChannelOption: { type: "localstorage" },
};

const syncState = createStateSyncMiddleware(config);

export default syncState;
