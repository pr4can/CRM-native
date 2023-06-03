import { getRootRoutesByRole, Route as IRoute } from "config/routes";
import { publicRoutes } from "config/routes/publicRoutes";
import useAuthUser from "hooks/useAuthUser";
import { FC } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { EntityUser } from "types/models/EntityUser";

type GetRoutes = ({ user, isAuth }: { user?: EntityUser; isAuth: boolean }) => IRoute[];

interface RouterProps {
	getRoutes?: GetRoutes;
}

const defaultGetRoutes: GetRoutes = ({ isAuth, user }) => {
	return isAuth ? getRootRoutesByRole(user.role) : publicRoutes;
};

const Router: FC<RouterProps> = ({ getRoutes = defaultGetRoutes }) => {
	const { isAuth, user } = useAuthUser();

	const routes = getRoutes({ user, isAuth });

	return <RouterProvider router={createBrowserRouter(routes)} />;
};

export default Router;
