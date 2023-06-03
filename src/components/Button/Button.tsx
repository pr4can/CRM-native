import { Button as ButtonAntd } from "antd";
import { ButtonProps as ButtonPropsAntd } from "antd/lib/button";
import { FC } from "react";
import concatClasses from "utils/concatClasses";
import styles from "./Button.module.scss";

export interface ButtonProps extends ButtonPropsAntd {
	isCircle?: boolean;
	isIcon?: boolean;
}

const Button: FC<ButtonProps> = ({ onClick, className, children, isIcon = false, isCircle, ...props }) => {
	return (
		<ButtonAntd
			onClick={onClick}
			className={concatClasses(
				styles.button,
				className,
				isCircle && styles.button_circle,
				isIcon && styles.button_icon
			)}
			{...props}>
			{children}
		</ButtonAntd>
	);
};

export default Button;
