import { FC, ReactNode } from "react";

export interface LayoutCommonProps {
	children?: ReactNode;
}

const LayoutCommon: FC<LayoutCommonProps> = ({ children }) => {
	return <>{children}</>;
};

export default LayoutCommon;
