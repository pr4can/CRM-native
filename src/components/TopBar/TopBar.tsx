import { FC, ReactNode } from "react";
import concatClasses from "utils/concatClasses";
import styles from "./TopBar.module.scss";

interface TopBarProps {
    alignTop?: boolean;
	alignBottom?: boolean;
	alignEnd?: boolean;
	className?: string;
	children?: ReactNode | JSX.Element;
}

const TopBar: FC<TopBarProps> = ({ alignTop = false, alignBottom = false, alignEnd = false, className, children, ...props }) => {
	return (
		<div
			className={concatClasses(
				styles.topBar,
                alignTop && styles.topBar__alignTop,
				alignBottom && styles.topBar__alignBottom,
				alignEnd && styles.topBar__alignEnd,
				className
			)}
			{...props}>
			{children}
		</div>
	);
};

export default TopBar;
