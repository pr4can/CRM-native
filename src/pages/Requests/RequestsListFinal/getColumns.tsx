import { TableProps } from "antd";
import TableHeaderController from "components/TableHeaderController/TableHeaderController";
import { FinalRequestTableRow } from "types/models/EntityProductCategory";

interface GetColumnsArgs {
	handleFilterChange?: (key: string, value: string) => void;
}

const getColumns = ({ handleFilterChange }: GetColumnsArgs = {}): TableProps<FinalRequestTableRow>["columns"] => [
	{
		dataIndex: "categoryName",
		title: "Категория",
		render: (value) => <b>{value}</b>,
	},
	{
		dataIndex: "productName",
		title: "Наименование",
	},
	{
		dataIndex: "provider",
		title: !handleFilterChange ? (
			"Поставщик"
		) : (
			<TableHeaderController
				title="Поставщик"
				propertyName="provider"
				inputFilter
				handleFilterChange={handleFilterChange}
			/>
		),
	},
	{
		dataIndex: "subdivisionCategory",
		title: "Вид СП",
	},
	{
		dataIndex: "measurement",
		title: "Единицы",
	},
	{
		dataIndex: "quantity",
		title: "Количество",
	},
];

export default getColumns;
