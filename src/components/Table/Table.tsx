import { Table as TableAntd, TableProps as TablePropsAntd } from "antd";
import { useMemo } from "react";
import concatClasses from "utils/concatClasses";
import { VList } from "virtuallist-antd";
import styles from "./Table.module.scss";

interface TableProps<T extends object> extends TablePropsAntd<T> {}

const Table = <T extends object>({ scroll, className, ...props }: TableProps<T>) => {
	const vComponent = useMemo(() => {
		return VList({
			height: scroll?.y,
		});
	}, []);

	return (
		<TableAntd
			showSorterTooltip={false}
			className={concatClasses(className, styles.table)}
			scroll={scroll}
			components={vComponent}
			pagination={false}
			{...props}
		/>
	);
};

export default Table;
