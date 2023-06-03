import Button from "components/Button/Button";
import Modal from "components/Modal/Modal";
import PageTitle from "components/PageTitle/PageTitle";
import Table from "components/Table/Table";
import TopBar from "components/TopBar/TopBar";
import { authUrl } from "config/path";
import useFilter from "hooks/useFilter";
import useModal from "hooks/useModal";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router";
import { useDeleteMeasurementsMutation, useGetAllMeasurementsQuery } from "services/measurementsServices";
import height from "staticContent/height";
import { measurementsSerializer } from "utils/serializers/measurements";
import columnsTable from "./columnsTable";

const MeasurementsList = () => {
	const navigate = useNavigate();
	const [deleteId, setDeleteId] = useState<number | undefined>(undefined);
	const { open, isOpen, close } = useModal();
	const { handleFilterChange, filterQuery } = useFilter();

	const { data, isLoading, isFetching } = useGetAllMeasurementsQuery(filterQuery);
	const [deleteMeasurements] = useDeleteMeasurementsMutation();

	const measurements = useMemo(() => measurementsSerializer(data), [data]);

	const openDeleteModal = (id?: number) => {
		setDeleteId(id);
		open();
	};

	const deleteItem = () => {
		deleteId && deleteMeasurements(deleteId).unwrap().then(close);
	};

	const addNew = () => {
		navigate(authUrl.Index.Measurements.New.url);
	};

	return (
		<>
			<TopBar>
				<PageTitle>Единицы измерения</PageTitle>
				<Button onClick={addNew}>Добавить</Button>
			</TopBar>
			<Table
				columns={columnsTable({ openDeleteModal, handleFilterChange })}
				dataSource={measurements}
				loading={isLoading || isFetching}
				scroll={{ y: height.measurements }}
			/>
			<Modal title="Удалить единицу измерения?" open={isOpen} onCancel={close} onOk={deleteItem} />
		</>
	);
};

export default MeasurementsList;
