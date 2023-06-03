import { Menu as MenuAntd, MenuProps } from "antd";
import { SelectInfo } from "rc-menu/lib/interface";
import { FC, useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import headerMenuItems from "staticContent/menu";
import { useAppSelector } from "store";
import menuHelper, { MenuItemType, MenuItemsOriginal } from "utils/menuHelper";
import styles from "./Menu.module.scss";

interface MenuItem extends SelectInfo {
	url?: MenuItemType["url"];
}

const Menu: FC = () => {
	const navigate = useNavigate();
	const location = useLocation();

	const { role } = useAppSelector((state) => state.user.user);
	const [activeKey, setActiveKey] = useState<string>();

	const menuItems: MenuItemsOriginal = useMemo(() => {
		return menuHelper.createMenuItems(headerMenuItems({ role })).getByRole(role).getOriginal();
	}, [headerMenuItems]);

	useEffect(() => {
		const activeKeyByPathname = menuHelper.createMenuItems(headerMenuItems({ role })).getActiveKey(location.pathname);
		if (!activeKey || !activeKeyByPathname || activeKeyByPathname !== activeKey) setActiveKey(activeKeyByPathname);
	}, [location.pathname]);

	const menuSelectedHandler = (menuItem: MenuItem) => {
		const menuItemSource = menuItem.item as any;

		menuItem = {
			...menuItem,
			url: menuItemSource?.props?.url,
		};

		if (menuItem?.url) {
			menuItem?.url && navigate(menuItem.url);
			setActiveKey(menuItem.key);
		}
	};

	const menuItemClickHandler: MenuProps["onClick"] = (item) => {
		const itemKey = item.key;
		const clickedMenuItem: MenuItemType = menuItems.find((item) => item.key === itemKey);

		clickedMenuItem?.url && navigate(clickedMenuItem.url);
	};

	return (
		<MenuAntd
			className={styles.menu}
			mode="vertical"
			selectedKeys={activeKey !== undefined ? [activeKey] : undefined}
			items={menuItems}
			onSelect={menuSelectedHandler}
			onClick={menuItemClickHandler}
		/>
	);
};

export default Menu;
