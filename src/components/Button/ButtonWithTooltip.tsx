import Tooltip from "components/Tooltip/Tooltip";
import { FC } from "react";
import Button, { ButtonProps } from "./Button";

interface ButtonWithTooltipProps extends ButtonProps {}

const ButtonWithTooltip: FC<ButtonWithTooltipProps> = ({ title, className, children, ...props }) => {
	return (
		<Tooltip title={title}>
			<Button className={className} {...props}>
				{children}
			</Button>
		</Tooltip>
	);
};

export default ButtonWithTooltip;
