import { FC, ReactNode } from "react";
import styles from "./TableActions.module.scss";

interface TableActions {
	children?: ReactNode;
}

const TableActions: FC<TableActions> = ({ children }) => {
	return <div className={styles.actions}>{children}</div>;
};

export default TableActions;
