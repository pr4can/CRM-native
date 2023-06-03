import Button from "components/Button/Button";
import Modal from "components/Modal/Modal";
import PageTitle from "components/PageTitle/PageTitle";
import Table from "components/Table/Table";
import TopBar from "components/TopBar/TopBar";
import { authUrl } from "config/path";
import useFilter from "hooks/useFilter";
import useModal from "hooks/useModal";
import useSort from "hooks/useSort";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router";
import { useDeleteUsersMutation, useGetAllUsersQuery } from "services/usersServices";
import height from "staticContent/height";
import { usersSerializer } from "utils/serializers/usersSerializers";
import columnsTable from "./columnsTable";

const UsersList = () => {
	const navigate = useNavigate();
	const [deleteId, setDeleteId] = useState<number | undefined>(undefined);
	const { open, isOpen, close } = useModal();
	const { handleFilterChange, filterQuery } = useFilter();
	const { sort, sortValue, handleSortChange } = useSort();

	const { data, isLoading, isFetching } = useGetAllUsersQuery({ ...filterQuery, ...sortValue });
	const [deleteUsers] = useDeleteUsersMutation();

	const users = useMemo(() => usersSerializer(data), [data]);

	const openDeleteModal = (id?: number) => {
		setDeleteId(id);
		open();
	};

	const deleteItem = () => {
		deleteId && deleteUsers(deleteId).unwrap().then(close);
	};

	const addNew = () => {
		navigate(authUrl.Index.Users.New.url);
	};

	return (
		<>
			<TopBar>
				<PageTitle>Клиенты</PageTitle>
				<Button onClick={addNew}>Добавить</Button>
			</TopBar>
			<Table
				columns={columnsTable({ openDeleteModal, handleFilterChange, sort, handleSortChange })}
				dataSource={users}
				loading={isLoading || isFetching}
				scroll={{ y: height.users }}
			/>
			<Modal title="Удалить клиента?" open={isOpen} onCancel={close} onOk={deleteItem} />
		</>
	);
};

export default UsersList;
