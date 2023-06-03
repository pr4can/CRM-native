import { authUrl } from "config/path";
import { UserRole } from "types/models/EntityUser";
import { MenuItemsType } from "utils/menuHelper";

interface HeaderMenuItemsArgs {
	role: UserRole;
}

const requestsUrlByRole: Record<UserRole, string> = {
	[UserRole.Admin]: authUrl.Index.RequestsAdmin.List.url,
	[UserRole.SimpleUser]: authUrl.Index.Requests.List.url,
};

const headerMenuItems = ({ role }: HeaderMenuItemsArgs): MenuItemsType => {
	return [
		{
			key: "0",
			url: requestsUrlByRole[role],
			label: "Заявки",
			forRoles: [UserRole.SimpleUser, UserRole.Admin],
		},
		{
			key: "1",
			url: authUrl.Index.Users.List.url,
			label: "Клиенты",
			forRoles: [UserRole.Admin],
		},
		{
			key: "2",
			url: authUrl.Index.Products.List.url,
			label: "Продукты",
			forRoles: [UserRole.Admin],
		},
		{
			key: "3",
			url: authUrl.Index.StructuralSubDivisionCategories.List.url,
			label: "Виды СП",
			forRoles: [UserRole.Admin],
		},
		{
			key: "4",
			url: authUrl.Index.ProductCategories.List.url,
			label: "Категории продуктов",
			forRoles: [UserRole.Admin],
		},
		{
			key: "5",
			url: authUrl.Index.Measurements.List.url,
			label: "Единицы измерения",
			forRoles: [UserRole.Admin],
		},
	];
};

export default headerMenuItems;
