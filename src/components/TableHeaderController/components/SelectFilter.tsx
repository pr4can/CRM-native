import { Select, SelectProps } from "antd";
import { FC } from "react";
import styles from "../TableHeaderController.module.scss";

interface SelectFilterProps extends SelectProps {
	setSearchValue: React.Dispatch<React.SetStateAction<string | undefined>>;
}

const SelectFilter: FC<SelectFilterProps> = ({ setSearchValue, ...props }) => {
	return <Select className={styles.select} {...props} onSelect={(value) => setSearchValue(value)} />;
};

export default SelectFilter;
