import { FormInstance, TableProps } from "antd";
import ActionsCell from "pages/Requests/components/ActionsCell";
import { RequestTableRow } from "types/models/EntityProductCategory";

interface GetColumnsArgs {
	form: FormInstance;
	disabledKeys: string[];
	onAddDisabledKey: (key: string) => void;
	onRemoveDisabledKey: (key: string) => void;
	mobileSize?: boolean;
	disabled: boolean;
}

const getColumns = ({
	form,
	disabledKeys,
	onRemoveDisabledKey,
	onAddDisabledKey,
	mobileSize,
	disabled,
}: GetColumnsArgs): TableProps<RequestTableRow>["columns"] => {
	const originColumns = [
		{
			dataIndex: "categoryName",
			title: "Категория",
			hidden: mobileSize,
		},
		{
			dataIndex: "productName",
			title: "Наименование",
			width: mobileSize ? "20%" : "auto",
		},
		{
			dataIndex: "measurement",
			title: "Единицы",
			width: mobileSize ? "8%" : "auto",
		},
		{
			dataIndex: "quantity",
			title: "Количество",
			width: mobileSize ? "20%" : "auto",
			editable: true,
		},
		{
			dataIndex: "actions",
			render: (_: undefined, { isCat, ...record }: RequestTableRow) =>
				!isCat && (
					<ActionsCell
						form={form}
						data={record}
						disabledKeys={disabledKeys}
						disabled={disabled}
						hiddenText={mobileSize}
					/>
				),
			width: mobileSize ? "8%" : 205,
		},
	].filter((item) => !item.hidden);

	const editableColumns = originColumns.map((col) =>
		!col.editable
			? col
			: {
					...col,
					onCell: (record: RequestTableRow) => ({
						form,
						record,
						editable: col.editable,
						dataIndex: col.dataIndex,
						title: col.title,
						onAddDisabledKey,
						onRemoveDisabledKey,
						disabled,
					}),
			  }
	);
	return editableColumns;
};

export default getColumns;
