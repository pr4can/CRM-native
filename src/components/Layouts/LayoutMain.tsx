import { LogoutOutlined } from "@ant-design/icons";
import { Button, Layout } from "antd";
import usePage from "components/Context/PageContext";
import Menu from "components/Menu/Menu";
import { FC, useMemo } from "react";
import { useAppDispatch } from "store";
import { logout } from "store/slices/userSlice";
import concatClasses from "utils/concatClasses";
import styles from "./Layout.module.scss";
import { LayoutCommonProps } from "./LayoutCommon";

const { Sider, Content } = Layout;

interface MainLayoutProps extends LayoutCommonProps {}

const LayoutMain: FC<MainLayoutProps> = ({ children }) => {
	const dispatch = useAppDispatch();
	const { windowSize } = usePage();

	const mobileSize = useMemo(() => windowSize.width <= 475, [windowSize.width]);

	const onLogout = () => {
		dispatch(logout());
	};

	return (
		<Layout className={styles.layout}>
			<Sider className={styles.sider} trigger={null} collapsible>
				<Menu />
				<Button className={concatClasses(styles.exit)} onClick={onLogout}>
					{mobileSize ? <LogoutOutlined style={{ fontSize: "24px" }} /> : "Выход"}
				</Button>
			</Sider>
			<Layout className={styles.layout__main}>
				<Content className={concatClasses(styles.content)}>{children}</Content>
			</Layout>
		</Layout>
	);
};

export default LayoutMain;
