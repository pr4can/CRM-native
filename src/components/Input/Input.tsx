import { Input as InputAntd, InputProps as InputAntdProps, InputRef } from "antd/es";
import { FC, Ref, forwardRef } from "react";
import concatClasses from "utils/concatClasses";
import styles from "./Input.module.scss";

export type InputType =
	| "button"
	| "checkbox"
	| "color"
	| "date"
	| "datetime-local"
	| "email"
	| "file"
	| "hidden"
	| "image"
	| "month"
	| "number"
	| "password"
	| "radio"
	| "range"
	| "reset"
	| "search"
	| "submit"
	| "tel"
	| "text"
	| "time"
	| "url"
	| "week"
	| string;

export interface InputProps extends InputAntdProps {
	ref?: Ref<InputRef>;
	type?: InputType;
	textCenter?: boolean;
}

const Input: FC<InputProps> = forwardRef(({ type = "text", className, textCenter, ...props }, ref: Ref<InputRef>) => {
	return (
		<InputAntd
			type={type}
			ref={ref}
			className={concatClasses(styles.input, textCenter && styles.input__center, className)}
			{...props}
		/>
	);
});

export default Input;
