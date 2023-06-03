import LayoutMain from "components/Layouts/LayoutMain";
import { FC } from "react";
import { Outlet } from "react-router-dom";

interface AuthorizedLayoutPageProps {}

const AuthorizedLayoutPage: FC<AuthorizedLayoutPageProps> = () => {
	return (
		<LayoutMain>
			<Outlet />
		</LayoutMain>
	);
};

export default AuthorizedLayoutPage;
