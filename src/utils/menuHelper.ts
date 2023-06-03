import { ItemType } from "antd/lib/menu/hooks/useItems";
import { UserRole } from "types/models/EntityUser";
import arrayHelper from "./arrayHelper";

export type MenuItemOriginal = ItemType;
export type MenuItemsOriginal = MenuItemOriginal[];

export type MenuItemType = ItemType & {
	children?: MenuItemType[];
	url?: string;
	sideUrl?: boolean;
	forRoles?: UserRole[];
};
export type MenuItemsType = MenuItemType[];

type MenuItemInitializer = (menuItems: MenuItemsType) => MenuItem;

interface MenuItem {
	value: MenuItemsType;
	getOriginal: () => MenuItemsOriginal;
	getActiveKey: (pathname: string) => string | undefined;
	getByRole: (role: UserRole) => MenuItem;
}

interface UrlPartsMatchCount {
	matchCount: number;
	sideUrl: boolean;
	menuKey?: string;
}

const transformToOriginalItems = (menuItems: MenuItemsType): MenuItemsOriginal => {
	return menuItems.map(({ sideUrl, children, forRoles, ...menuItem }) => {
		return { ...menuItem, children: children ? transformToOriginalItems(children) : undefined };
	});
};

const _getUrlPartsMatchCount = (matchCount: number, menuItem: MenuItemType): UrlPartsMatchCount => ({
	matchCount,
	menuKey: menuItem.key?.toString(),
	sideUrl: !!menuItem.sideUrl,
});

const getUrlPartsMatchCount = (menuItem: MenuItemType, pathname: string, separator: string = "/") => {
	const wordParts = pathname
		.replace(/^\//, "")
		.split(separator)
		.filter((i) => i !== "");
	const gluedParts = [];
	let matchCount = 0;

	if (!wordParts.length) return _getUrlPartsMatchCount(matchCount, menuItem);

	for (let part of wordParts) {
		gluedParts.push(part);

		if (menuItem.url?.match(new RegExp("(^|/)" + gluedParts.join(separator) + "($|" + separator + ")", "i"))) {
			matchCount++;
		} else return _getUrlPartsMatchCount(matchCount, menuItem);
	}

	return _getUrlPartsMatchCount(matchCount, menuItem);
};

const getActiveKey = (menuItems: MenuItemsType, pathname: string): string | undefined => {
	const flattenMenuItems = arrayHelper.flatten(menuItems);
	const matchedList = flattenMenuItems.map((item) => getUrlPartsMatchCount(item, pathname));

	return matchedList.reduce(
		(prev: UrlPartsMatchCount | undefined, current) =>
			current.matchCount > (prev?.matchCount ?? 0) && !current.sideUrl ? current : prev,
		undefined
	)?.menuKey;
};

const getByRole = (menuItems: MenuItemsType, role: UserRole): MenuItemsType =>
	menuItems.filter((menuItem) => menuItem?.forRoles?.includes(role));

const createMenuItems: MenuItemInitializer = (menuItems) => {
	let items = [...menuItems];
	return {
		set value(menuItems: MenuItemsType) {
			items = [...menuItems];
		},
		get value() {
			return items;
		},
		getOriginal() {
			return transformToOriginalItems(this.value);
		},
		getActiveKey(pathname) {
			return getActiveKey(this.value, pathname);
		},
		getByRole(role: UserRole) {
			items = getByRole(this.value, role);
			return this;
		},
	};
};

const menuHelper = { createMenuItems };
export default menuHelper;
