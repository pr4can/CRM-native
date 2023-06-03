import React, { CSSProperties, FC, ReactNode } from "react";
import concatClasses from "utils/concatClasses";
import styles from "./RequestIsCompleted.module.scss";

interface RequestIsCompletedProps {
	show?: boolean;
	children?: ReactNode | ReactNode[];
	width?: CSSProperties["width"];
	noPadding?: boolean;
	noMargin?: boolean;
}

// todo: refactor it (noMargin, noPadding, width etc)
const RequestIsCompleted: FC<RequestIsCompletedProps> = ({ show, width, noPadding, noMargin, children }) => {
	return (
		<div
			style={{ width }}
			className={concatClasses(
				styles.wrapper,
				noPadding && styles.wrapper_noPadding,
				noMargin && styles.wrapper_noMargin
			)}>
			{show ? children : null}
		</div>
	);
};

export default RequestIsCompleted;
