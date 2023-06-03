import { Select as SelectAntd, SelectProps as SelectPropsAntd } from "antd";
import { FC } from "react";
import concatClasses from "utils/concatClasses";
import styles from "./Select.module.scss";

interface SelectProps extends SelectPropsAntd {}

const Select: FC<SelectProps> = ({ className, ...props }) => {
	return (
		<SelectAntd
			className={concatClasses(styles.select, className)}
			popupClassName={styles.select__dropdown}
			{...props}
		/>
	);
};

export default Select;
