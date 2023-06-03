import { ColumnsType } from "antd/es/table";
import ButtonWithTooltip from "components/Button/ButtonWithTooltip";
import Icons from "components/Icons/Icons";
import TableActions from "components/TableActions/TableActions";
import TableHeaderController from "components/TableHeaderController/TableHeaderController";
import { authUrl } from "config/path";
import { ISort, SortType } from "hooks/useSort";
import { generatePath } from "react-router";
import { Link } from "react-router-dom";
import { EntityUserTable } from "types/models/EntityUser";

interface ColumnsTableProps {
	openDeleteModal: (id?: number) => void;
	handleFilterChange: (key: string, value: string) => void;
	sort?: ISort;
	handleSortChange?: (sortColumnName: string, typeSort: SortType) => void;
}

const columnsTable = ({
	openDeleteModal,
	handleFilterChange,
	sort,
	handleSortChange,
}: ColumnsTableProps): ColumnsType<EntityUserTable> => {
	return [
		{
			key: "name",
			title: (
				<TableHeaderController
					title="ФИО"
					propertyName="Name"
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
			key: "password",
			title: "Пароль",
			dataIndex: "password",
		},
		{
			key: "phone",
			title: "Телефон",
			dataIndex: "phone",
		},
		{
			key: "organization",
			title: (
				<TableHeaderController
					title="СП"
					propertyName="Organization"
					inputFilter
					handleFilterChange={handleFilterChange}
					sorting
					sort={sort}
					handleSortChange={handleSortChange}
				/>
			),
			dataIndex: "organization",
		},
		{
			key: "address",
			title: (
				<TableHeaderController
					title="Адрес"
					propertyName="Address"
					inputFilter
					handleFilterChange={handleFilterChange}
					sorting
					sort={sort}
					handleSortChange={handleSortChange}
				/>
			),
			dataIndex: "address",
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
						<Link to={generatePath(authUrl.Index.Users.Edit.url, { id: data.id })}>
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
