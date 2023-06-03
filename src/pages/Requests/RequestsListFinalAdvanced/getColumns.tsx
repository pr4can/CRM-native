import { TableProps } from "antd";
import TableHeaderController from "components/TableHeaderController/TableHeaderController";
import { AdvancedFinalRequestTableRow } from "types/models/EntityProductCategory";

interface GetColumnsArgs {
	handleFilterChange?: (key: string, value: string) => void;
}

const getColumns = ({
	handleFilterChange,
}: GetColumnsArgs = {}): TableProps<AdvancedFinalRequestTableRow>["columns"] => [
	{
		dataIndex: "clientOrganization",
		title: !handleFilterChange ? (
			"СП"
		) : (
			<TableHeaderController
				title="СП"
				propertyName="StructuralSubdivision"
				inputFilter
				handleFilterChange={handleFilterChange}
			/>
		),
		render: (value) => <b>{value}</b>,
	},
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
				propertyName="Provider"
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
