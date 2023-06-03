import { Input, InputProps } from "antd";
import { FC } from "react";
import styles from "../TableHeaderController.module.scss";

interface InputFilterProps extends InputProps {
	setSearchValue: React.Dispatch<React.SetStateAction<string>>;
}

const InputFilter: FC<InputFilterProps> = ({ setSearchValue, ...props }) => {
	return (
		<Input
			className={styles.input}
			placeholder="Найти..."
			onChange={(event) => setSearchValue(event.target.value)}
			{...props}
		/>
	);
};

export default InputFilter;
