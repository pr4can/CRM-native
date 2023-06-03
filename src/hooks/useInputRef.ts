import { InputRef } from "antd";
import { useEffect, useRef } from "react";

const useInputRef = () => {
	const inputRef = useRef<InputRef | null>(null);

	useEffect(() => {
		inputRef?.current?.focus();
	}, []);
    
	return inputRef;
};

export default useInputRef;
