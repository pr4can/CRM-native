import LayoutCommon from "components/Layouts/LayoutCommon";
import { FC } from "react";
import { Outlet } from "react-router-dom";

const PublicLayoutPage: FC = () => {
	return (
		<LayoutCommon>
			<Outlet />
		</LayoutCommon>
	);
};

export default PublicLayoutPage;
