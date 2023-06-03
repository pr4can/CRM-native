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
import { useDeleteProductsMutation, useGetAllProductsQuery } from "services/productsServices";
import height from "staticContent/height";
import { productsSerializer } from "utils/serializers/productsSerializers";
import columnsTable from "./columnsTable";

const ProductsList = () => {
	const navigate = useNavigate();
	const [deleteId, setDeleteId] = useState<number | undefined>(undefined);
	const { open, isOpen, close } = useModal();
	const { handleFilterChange, filterQuery } = useFilter();
	const { sort, sortValue, handleSortChange } = useSort();

	const { data, isLoading, isFetching } = useGetAllProductsQuery({ ...filterQuery, ...sortValue });
	const [deleteProducts] = useDeleteProductsMutation();

	const products = useMemo(() => productsSerializer(data), [data]);

	const openDeleteModal = (id?: number) => {
		setDeleteId(id);
		open();
	};

	const deleteItem = () => {
		deleteId && deleteProducts(deleteId).unwrap().then(close);
	};

	const addNew = () => {
		navigate(authUrl.Index.Products.New.url);
	};

	return (
		<>
			<TopBar>
				<PageTitle>Продукты</PageTitle>
				<Button onClick={addNew}>Добавить</Button>
			</TopBar>
			<Table
				columns={columnsTable({ openDeleteModal, handleFilterChange, sort, handleSortChange })}
				dataSource={products}
				loading={isLoading || isFetching}
				scroll={{ y: height.products }}
			/>
			<Modal title="Удалить продукт?" open={isOpen} onCancel={close} onOk={deleteItem} />
		</>
	);
};

export default ProductsList;
