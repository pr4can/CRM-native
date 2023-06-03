import { Tooltip as TooltipAntd, TooltipProps } from "antd";
import { FC } from "react";

const Tooltip: FC<TooltipProps> = ({ children, ...props }) => {
	const tooltipStyles = {
		fontSize: "14px",
		padding: "5px 10px",
		color: "#588157",
		backgroundColor: "white",
		borderRadius: "30px",
		boxShadow: "1px 0 10px 0 rgba(0, 0, 0, 0.1)",
	};

	return (
		<TooltipAntd placement="bottomRight" arrow={false} overlayInnerStyle={tooltipStyles} {...props}>
			{children}
		</TooltipAntd>
	);
};

export default Tooltip;
