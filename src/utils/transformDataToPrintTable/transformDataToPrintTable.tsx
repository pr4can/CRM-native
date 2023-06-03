import { nanoid } from "@reduxjs/toolkit";
import { ColumnsType } from "antd/es/table";
import styles from "./transformDataToPrintTable.module.scss";

const transformDataToPrintTable = <T extends object>(data: T[], columns: ColumnsType<T>) => {
	return (
		<table className={styles.table}>
			<thead>
				<tr>
					{columns.map((column) => (
						<th key={`col-${nanoid(10)}`}>
							{typeof column.title === "function" ? (column as any).title() : column.title}
						</th>
					))}
				</tr>
			</thead>
			<tbody>
				{data.map((row) => (
					<tr key={`product-${nanoid(10)}`}>
						{columns.map((column) => (
							<td key={`product-td-${nanoid(10)}`}>{(row as any)[(column as any)?.dataIndex]}</td>
						))}
					</tr>
				))}
			</tbody>
		</table>
	);
};

export default transformDataToPrintTable;
