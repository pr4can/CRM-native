import "assets/scss/style.scss";
import { PageProvider } from "components/Context/PageContext";
import Router from "components/Router/Router";
import { FC } from "react";

const App: FC = () => {
	return (
		<PageProvider>
			<Router />
		</PageProvider>
	);
};

export default App;
