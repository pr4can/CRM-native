import { ColumnsType } from "antd/es/table";
import ButtonWithTooltip from "components/Button/ButtonWithTooltip";
import Icons from "components/Icons/Icons";
import TableActions from "components/TableActions/TableActions";
import TableHeaderController from "components/TableHeaderController/TableHeaderController";
import { authUrl } from "config/path";
import { ISort, SortType } from "hooks/useSort";
import { generatePath } from "react-router";
import { Link } from "react-router-dom";
import { EntityProductTable } from "types/models/EntityProduct";

interface ColumnsTableProps<T> {
	openDeleteModal: (id?: number) => void;
	handleFilterChange: (key: string, value: string) => void;
	sort?: ISort;
	handleSortChange?: (sortColumnName: string, typeSort: SortType) => void;
}

const columnsTable = <T extends object>({
	openDeleteModal,
	handleFilterChange,
	sort,
	handleSortChange,
}: ColumnsTableProps<T>): ColumnsType<EntityProductTable> => {
	return [
		{
			key: "name",
			title: (
				<TableHeaderController
					title="Название"
					propertyName="ProductName"
					inputFilter
					handleFilterChange={handleFilterChange}
					sorting
					sort={sort}
					handleSortChange={handleSortChange}
				/>
			),
			dataIndex: "name",
		},
		{
			key: "categoryId",
			title: (
				<TableHeaderController
					title="Категория"
					propertyName="ProductCategory"
					inputFilter
					handleFilterChange={handleFilterChange}
					sorting
					sort={sort}
					handleSortChange={handleSortChange}
				/>
			),
			dataIndex: "categoryId",
			render: (_, data) => {
				return data.productCategory.name;
			},
		},
		{
			key: "provider",
			title: (
				<TableHeaderController
					title="Поставщик"
					propertyName="Provider"
					inputFilter
					handleFilterChange={handleFilterChange}
					sorting
					sort={sort}
					handleSortChange={handleSortChange}
				/>
			),
			dataIndex: "provider",
		},
		{
			key: "measurementId",
			title: "Единица измерения",
			dataIndex: "measurementId",
			render: (_, data) => {
				return data.measurement.name;
			},
			width: "150px",
		},
		{
			key: "measurementMultiplicity",
			title: "Кратность измерения",
			dataIndex: "measurementMultiplicity",
			width: "150px",
		},
		{
			key: "structuralSubdivisionCategoryId",
			title: (
				<TableHeaderController
					title="Вид СП"
					propertyName="StructuralSubdivisionCategory"
					inputFilter
					handleFilterChange={handleFilterChange}
					sorting
					sort={sort}
					handleSortChange={handleSortChange}
				/>
			),
			dataIndex: "structuralSubdivisionCategoryId",
			render: (_, data) => {
				return data.structuralSubdivisionCategory.name;
			},
		},
		{
			key: "action",
			dataIndex: "action",
			render: (_, data) => {
				return (
					<TableActions>
						<Link to={generatePath(authUrl.Index.Products.Edit.url, { id: data.id })}>
							<ButtonWithTooltip title="Редактировать" isIcon>
								<Icons.Edit />
							</ButtonWithTooltip>
						</Link>
						<ButtonWithTooltip title="Удалить" isIcon>
							<Icons.Delete
								onClick={() => {
									openDeleteModal(data.id);
								}}
							/>
						</ButtonWithTooltip>
					</TableActions>
				);
			},
			width: "100px",
		},
	];
};

export default columnsTable;
