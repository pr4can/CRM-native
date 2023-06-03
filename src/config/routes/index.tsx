import AuthorizedLayoutPage from "components/LayoutPages/AuthorizedLayoutPage";
import Redirect from "components/Redirect/Redirect";
import RedirectToReturnUrl from "components/Redirect/RedirectToReturnUrl";
import { AuthorizedPath, authUrl, PublicPath, publicUrl } from "config/path";
import Measurements from "pages/Measurements/Measurements";
import MeasurementsCreate from "pages/Measurements/MeasurementsCreate/MeasurementsCreate";
import MeasurementsList from "pages/Measurements/MeasurementsList/MeasurementsList";
import NotFound from "pages/NotFound/NotFound";
import ProductCategories from "pages/ProductCategories/ProductCategories";
import ProductCategoriesCreate from "pages/ProductCategories/ProductCategoriesCreate/ProductCategoriesCreate";
import ProductCategoriesList from "pages/ProductCategories/ProductCategoriesList/ProductCategoriesList";
import Products from "pages/Products/Products";
import ProductsCreate from "pages/Products/ProductsCreate/ProductsCreate";
import ProductsList from "pages/Products/ProductsList/ProductsList";
import Requests from "pages/Requests/Requests";
import RequestsList from "pages/Requests/RequestsList/RequestsList";
import RequestsListFinal from "pages/Requests/RequestsListFinal/RequestsListFinal";
import RequestsListFinalAdvanced from "pages/Requests/RequestsListFinalAdvanced/RequestsListFinalAdvanced";
import RequestsListForAdmin from "pages/Requests/RequestsListForAdmin/RequestsListForAdmin";
import StructuralSubDivisionCategories from "pages/StructuralSubDivisionCategories/StructuralSubDivisionCategories";
import StructuralSubDivisionCategoriesCreate from "pages/StructuralSubDivisionCategories/StructuralSubDivisionCategoriesCreate/StructuralSubDivisionCategoriesCreate";
import StructuralSubDivisionCategoriesList from "pages/StructuralSubDivisionCategories/StructuralSubDivisionCategoriesList/StructuralSubDivisionCategoriesList";
import Users from "pages/Users/Users";
import UsersCreate from "pages/Users/UsersCreate/UsersCreate";
import UsersList from "pages/Users/UsersList/UsersList";
import { RouteObject } from "react-router-dom";
import { UserAcceptRole, UserRole } from "types/models/EntityUser";

export type Route<Path extends PublicPath | AuthorizedPath = PublicPath | AuthorizedPath> = RouteObject & {
	path: Path | string;
};

export type RoleRoute<Path extends PublicPath | AuthorizedPath = PublicPath | AuthorizedPath> = Omit<
	Route<Path>,
	"children"
> & {
	forRoles?: (UserRole | UserAcceptRole)[];
	children?: RoleRoute<Path>[];
};

export type PublicRoute = Route<PublicPath>;
export type AuthRoute = RoleRoute<AuthorizedPath>;

export const rootRoutes = (role: UserRole): AuthRoute[] => [
	{
		path: authUrl.Index.path,
		element: <AuthorizedLayoutPage />,
		forRoles: [UserRole.SimpleUser, UserRole.Admin, "All"],
		children: [
			{
				path: authUrl.Index.Requests.path,
				element: <Requests />,
				forRoles: [UserRole.SimpleUser],
				children: [
					{
						path: authUrl.Index.Requests.List.path,
						element: <RequestsList />,
						forRoles: [UserRole.SimpleUser],
					},
				],
			},
			{
				path: authUrl.Index.RequestsAdmin.path,
				element: <Requests />,
				forRoles: [UserRole.Admin],
				children: [
					{
						path: authUrl.Index.RequestsAdmin.List.path,
						element: <RequestsListForAdmin />,
						forRoles: [UserRole.Admin],
					},
					{
						path: authUrl.Index.RequestsAdmin.EditByDate.path,
						element: <RequestsList />,
						forRoles: [UserRole.Admin],
					},
					{
						path: authUrl.Index.RequestsAdmin.FinalList.path,
						element: <RequestsListFinal />,
						forRoles: [UserRole.Admin],
					},
					{
						path: authUrl.Index.RequestsAdmin.AdvancedFinalList.path,
						element: <RequestsListFinalAdvanced />,
						forRoles: [UserRole.Admin],
					},
				],
			},
			{
				path: authUrl.Index.Users.path,
				element: <Users />,
				forRoles: [UserRole.Admin],
				children: [
					{
						path: authUrl.Index.Users.List.path,
						element: <UsersList />,
						forRoles: [UserRole.Admin],
					},
					{
						path: authUrl.Index.Users.Edit.path,
						element: <UsersCreate isEdit />,
						forRoles: [UserRole.Admin],
					},
					{
						path: authUrl.Index.Users.New.path,
						element: <UsersCreate />,
						forRoles: [UserRole.Admin],
					},
				],
			},
			{
				path: authUrl.Index.Products.path,
				element: <Products />,
				forRoles: [UserRole.Admin],
				children: [
					{
						path: authUrl.Index.Products.List.path,
						element: <ProductsList />,
						forRoles: [UserRole.Admin],
					},
					{
						path: authUrl.Index.Products.Edit.path,
						element: <ProductsCreate isEdit />,
						forRoles: [UserRole.Admin],
					},
					{
						path: authUrl.Index.Products.New.path,
						element: <ProductsCreate />,
						forRoles: [UserRole.Admin],
					},
				],
			},
			{
				path: authUrl.Index.StructuralSubDivisionCategories.path,
				element: <StructuralSubDivisionCategories />,
				forRoles: [UserRole.Admin],
				children: [
					{
						path: authUrl.Index.StructuralSubDivisionCategories.List.path,
						element: <StructuralSubDivisionCategoriesList />,
						forRoles: [UserRole.Admin],
					},
					{
						path: authUrl.Index.StructuralSubDivisionCategories.Edit.path,
						element: <StructuralSubDivisionCategoriesCreate isEdit />,
						forRoles: [UserRole.Admin],
					},
					{
						path: authUrl.Index.StructuralSubDivisionCategories.New.path,
						element: <StructuralSubDivisionCategoriesCreate />,
						forRoles: [UserRole.Admin],
					},
				],
			},
			{
				path: authUrl.Index.ProductCategories.path,
				element: <ProductCategories />,
				forRoles: [UserRole.Admin],
				children: [
					{
						path: authUrl.Index.ProductCategories.List.path,
						element: <ProductCategoriesList />,
						forRoles: [UserRole.Admin],
					},
					{
						path: authUrl.Index.ProductCategories.Edit.path,
						element: <ProductCategoriesCreate isEdit />,
						forRoles: [UserRole.Admin],
					},
					{
						path: authUrl.Index.ProductCategories.New.path,
						element: <ProductCategoriesCreate />,
						forRoles: [UserRole.Admin],
					},
				],
			},
			{
				path: authUrl.Index.Measurements.path,
				element: <Measurements />,
				forRoles: [UserRole.Admin],
				children: [
					{
						path: authUrl.Index.Measurements.List.path,
						element: <MeasurementsList />,
						forRoles: [UserRole.Admin],
					},
					{
						path: authUrl.Index.Measurements.Edit.path,
						element: <MeasurementsCreate isEdit />,
						forRoles: [UserRole.Admin],
					},
					{
						path: authUrl.Index.Measurements.New.path,
						element: <MeasurementsCreate />,
						forRoles: [UserRole.Admin],
					},
				],
			},
			{
				path: authUrl.NotFound.path,
				element: <NotFound />,
				forRoles: [UserRole.Admin, UserRole.SimpleUser, "All"],
			},
			{
				path: "",
				element: (
					<Redirect
						pathname={role === UserRole.Admin ? authUrl.Index.RequestsAdmin.List.url : authUrl.Index.Requests.List.url}
					/>
				),
				forRoles: [UserRole.Admin, UserRole.SimpleUser, "All"],
			},
			{
				path: publicUrl.Index.Login.path,
				element: <RedirectToReturnUrl />,
				forRoles: [UserRole.Admin, UserRole.SimpleUser, "All"],
			},
			{
				path: authUrl.All.path,
				element: <Redirect pathname={authUrl.NotFound.url} />,
				forRoles: [UserRole.Admin, UserRole.SimpleUser, "All"],
			},
		],
	},
];

const getRoutesByRole = <Path extends PublicPath | AuthorizedPath = PublicPath | AuthorizedPath>(
	routes: RoleRoute<Path>[],
	role?: UserRole
): Route<Path>[] => {
	return routes
		?.filter((r) => r?.forRoles?.includes(role) || r?.forRoles?.includes("All"))
		?.map(({ forRoles, ...route }) => ({
			...route,
			children: getRoutesByRole(route.children, role),
		})) as Route<Path>[];
};

export const getRootRoutesByRole = (role: UserRole) => {
	return getRoutesByRole(rootRoutes(role), role);
};
