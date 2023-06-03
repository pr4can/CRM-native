import { FC, ReactNode } from "react";
import concatClasses from "utils/concatClasses";
import styles from "./TobBarInfo.module.scss";

interface TopBarInfoProps {
	alignTop?: boolean;
	alignEnd?: boolean;
	className?: string;
	children?: ReactNode | JSX.Element;
}

const TopBarInfo: FC<TopBarInfoProps> = ({ alignTop, alignEnd, className, children, ...props }) => {
	return (
		<div
			className={concatClasses(
				styles.topBarInfo,
				alignTop ? styles.topBarInfo__alignTop : styles.topBarInfo__alignCenter,
				alignEnd && styles.topBarInfo__alignEnd,
				className
			)}
			{...props}>
			{children}
		</div>
	);
};

export default TopBarInfo;
