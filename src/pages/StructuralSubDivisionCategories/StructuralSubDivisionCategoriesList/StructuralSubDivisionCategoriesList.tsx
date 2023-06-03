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
import { useNavigate } from "react-router-dom";
import { useDeleteSSDCMutation, useGetAllSSDCQuery } from "services/structuralSubDivisionCategoriesServices";
import height from "staticContent/height";
import { structuralSubdivisionsSerializer } from "utils/serializers/structuralSubDivisionCategories";
import columnsTable from "./columnsTable";

const StructuralSubDivisionCategoriesList = () => {
	const navigate = useNavigate();
	const [deleteId, setDeleteId] = useState<number | undefined>(undefined);
	const { open, isOpen, close } = useModal();
	const { handleFilterChange, filterQuery } = useFilter();
	const { sort, sortValue, handleSortChange } = useSort();

	const { data, isLoading, isFetching } = useGetAllSSDCQuery({ ...filterQuery, ...sortValue });
	const [deleteSSDC] = useDeleteSSDCMutation();

	const structuralSubdivisions = useMemo(() => structuralSubdivisionsSerializer(data), [data]);

	const openDeleteModal = (id?: number) => {
		setDeleteId(id);
		open();
	};

	const deleteItem = () => {
		deleteId && deleteSSDC(deleteId).unwrap().then(close);
	};

	const addNew = () => {
		navigate(authUrl.Index.StructuralSubDivisionCategories.New.url);
	};

	return (
		<>
			<TopBar>
				<PageTitle>Виды структурных подразделений</PageTitle>
				<Button onClick={addNew}>Добавить</Button>
			</TopBar>
			<Table
				columns={columnsTable({ openDeleteModal, handleFilterChange, sort, handleSortChange })}
				dataSource={structuralSubdivisions}
				loading={isLoading || isFetching}
				scroll={{ y: height.subDivisionCategories }}
			/>
			<Modal title="Удалить структурное подраздление?" open={isOpen} onCancel={close} onOk={deleteItem} />
		</>
	);
};

export default StructuralSubDivisionCategoriesList;
