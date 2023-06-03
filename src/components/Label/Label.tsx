import { FormItemLabelProps } from "antd/es/form/FormItemLabel";
import { FC, ReactNode } from "react";
import concatClasses from "utils/concatClasses";
import styles from "./Label.module.scss";

interface LabelProps extends FormItemLabelProps {
	children?: ReactNode;
	className?: string;
	noInput?: boolean;
}

const Label: FC<LabelProps> = ({ children = "", className, noInput, ...props }) => {
	return (
		<span className={concatClasses(styles.label, className, noInput && styles.label_noInput)} {...props}>
			{children}
		</span>
	);
};

export default Label;
