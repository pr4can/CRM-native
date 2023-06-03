import { FC } from "react";
import InputMask from "react-input-mask";
import Input, { InputProps } from "./Input";

interface InputWithMaskProps extends InputProps {
	mask: string;
}

const InputWithMask: FC<InputWithMaskProps> = ({ mask, onChange, ...props }) => {
	return (
		<InputMask mask={mask} value={props.value} onInput={onChange}>
			<Input {...props} />
		</InputMask>
	);
};

export default InputWithMask;
