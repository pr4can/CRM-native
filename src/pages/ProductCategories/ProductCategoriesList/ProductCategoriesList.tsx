import Button from "components/Button/Button";
import Modal from "components/Modal/Modal";
import PageTitle from "components/PageTitle/PageTitle";
import Table from "components/Table/Table";
import TopBar from "components/TopBar/TopBar";
import { authUrl } from "config/path";
import useFilter from "hooks/useFilter";
import useModal from "hooks/useModal";
import useSort, { ISort, SortType } from "hooks/useSort";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router";
import {
	useDeleteProductCategoriesMutation,
	useGetAllProductCategoriesQuery,
} from "services/productCategoriesServices";
import height from "staticContent/height";
import { productCategoriesSerializer } from "utils/serializers/productCategoriesSerializers";
import columnsTable from "./columnsTable";

const ProductCategoriesList = () => {
	const navigate = useNavigate();
	const [deleteId, setDeleteId] = useState<number | undefined>(undefined);
	const { open, isOpen, close } = useModal();
	const { handleFilterChange, filterQuery } = useFilter();
	const { sort, sortValue, handleSortChange } = useSort({
		defaultSort: {
			typeSort: SortType.Ascend,
			sortColumnName: "Name",
		},
	});

	const { data, isLoading, isFetching } = useGetAllProductCategoriesQuery({ ...filterQuery, ...sortValue });
	const [deleteProductCategories] = useDeleteProductCategoriesMutation();

	const productCategories = useMemo(() => productCategoriesSerializer(data), [data]);

	const openDeleteModal = (id?: number) => {
		setDeleteId(id);
		open();
	};

	const deleteItem = () => {
		deleteId && deleteProductCategories(deleteId).unwrap().then(close);
	};

	const addNew = () => {
		navigate(authUrl.Index.ProductCategories.New.url);
	};

	return (
		<>
			<TopBar>
				<PageTitle>Категории продуктов</PageTitle>
				<Button onClick={addNew}>Добавить</Button>
			</TopBar>
			<Table
				columns={columnsTable({ openDeleteModal, handleFilterChange, sort: sort as ISort<object>, handleSortChange })}
				dataSource={productCategories}
				loading={isLoading || isFetching}
				scroll={{ y: height.productCategories }}
			/>
			<Modal title="Удалить категорию продуктов?" open={isOpen} onCancel={close} onOk={deleteItem} />
		</>
	);
};

export default ProductCategoriesList;
