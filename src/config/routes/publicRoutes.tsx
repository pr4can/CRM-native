import PublicLayoutPage from "components/LayoutPages/PublicLayoutPage";
import Redirect from "components/Redirect/Redirect";
import { publicUrl } from "config/path";
import Authorization from "pages/Authorization/Authorization";
import { PublicRoute } from ".";

/**
 * Роуты для неавторизованных пользователей
 * */
export const publicRoutes: PublicRoute[] = [
	{
		path: publicUrl.Index.path,
		element: <PublicLayoutPage />,
		children: [
			{
				path: publicUrl.Index.Login.path,
				element: <Authorization />,
			},
			{
				path: publicUrl.All.path,
				element: <Redirect pathname={publicUrl.Index.Login.url} />,
			},
			{
				path: "",
				element: <Redirect pathname={publicUrl.Index.Login.url} />,
			},
		],
	},
];
