import { TableProps } from "antd";
import Button from "components/Button/Button";
import Icons from "components/Icons/Icons";
import moment from "moment";
import { ClientRequest } from "types/models/EntityRequest";
import labels from "utils/labels";
import { sorter } from "utils/sorter";
import styles from "./RequestListForAdmin.module.scss";

interface GetColumnsArgs {
	onRedirectToClientRequest: (id?: number) => void;	
}

const getColumns = ({ onRedirectToClientRequest }: GetColumnsArgs): TableProps<ClientRequest>["columns"] => [
	{
		dataIndex: "clientName",
		title: "ФИО",
		sorter: (a, b) => sorter.lexicographic(a.clientName, b.clientName),
	},
	{
		dataIndex: "clientOrganization",
		title: "СП",
		sorter: (a, b) => sorter.lexicographic(a.clientOrganization, b.clientOrganization),
	},
	{
		dataIndex: "requestCreationDate",
		title: "Дата и время создания",
		render: (value) => (value ? moment(value).format("DD.MM.YYYY HH:mm") : labels.dash),
		sorter: (a, b) => sorter.byMomentDate(a.requestCreationDate, b.requestCreationDate),
	},
	{
		title: "Статус",
		dataIndex: "actions",
		render: (_, record) =>
			record.isRequestCreated ? (
				<Button icon={<Icons.Check />} onClick={() => onRedirectToClientRequest(record.clientId)} type={"text"}>
					Заявка
				</Button>
			) : (
				<div className={styles.tableStatus}>Нет заявок</div>
			),
	},
];

export default getColumns;
