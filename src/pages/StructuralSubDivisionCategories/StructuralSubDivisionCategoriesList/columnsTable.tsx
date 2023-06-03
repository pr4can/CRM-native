import { ColumnsType } from "antd/es/table";
import ButtonWithTooltip from "components/Button/ButtonWithTooltip";
import Icons from "components/Icons/Icons";
import TableActions from "components/TableActions/TableActions";
import TableHeaderController from "components/TableHeaderController/TableHeaderController";
import { authUrl } from "config/path";
import { ISort, SortType } from "hooks/useSort";
import { generatePath } from "react-router";
import { Link } from "react-router-dom";
import { EntityStructuralSubDivisionCategoryTable } from "types/models/EntityStructuralSubDivisionCategory";

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
}: ColumnsTableProps): ColumnsType<EntityStructuralSubDivisionCategoryTable> => {
	return [
		{
			key: "name",
			title: (
				<TableHeaderController
					title="Название"
					propertyName="Name"
					inputFilter
					handleFilterChange={handleFilterChange}
					sorting
					sort={sort}
					handleSortChange={handleSortChange}
				/>
			),
			dataIndex: "name",
			width: "20%",
		},
		{
			key: "action",
			dataIndex: "action",
			render: (_, data) => {
				return (
					<TableActions>
						<Link to={generatePath(authUrl.Index.StructuralSubDivisionCategories.Edit.url, { id: data.id })}>
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
		},
	];
};

export default columnsTable;
