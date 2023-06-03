import { ConfigProvider } from "antd";
import locale from "antd/locale/ru_RU";
import App from "App";
import theme from "config/theme";

import "dayjs/locale/ru";
import { Suspense } from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import reportWebVitals from "reportWebVitals";
import store, { persistor } from "./store";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

root.render(
	<ConfigProvider locale={locale} theme={theme}>
		<Provider store={store}>
			<PersistGate loading={null} persistor={persistor}>
				<Suspense fallback={<div />}>
					<App />
				</Suspense>
			</PersistGate>
		</Provider>
	</ConfigProvider>
);

reportWebVitals();
