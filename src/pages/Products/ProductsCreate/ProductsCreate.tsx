import { useForm } from "antd/lib/form/Form";
import Button from "components/Button/Button";
import FormLayout from "components/Form/Form";
import PageTitle from "components/PageTitle/PageTitle";
import { authUrl } from "config/path";
import useGetMeasurementsOptions from "hooks/options/useGetMeasurementsOptions";
import useGetProductCategoriesOptions from "hooks/options/useGetProductCategoriesOptions";
import useSSDCOptions from "hooks/options/useSSDCOptions";
import useInputRef from "hooks/useInputRef";
import { FC, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
	useAddNewProductsMutation,
	useGetOneProductsQuery,
	useUpdateProductsMutation,
} from "services/productsServices";
import { EntityProduct } from "types/models/EntityProduct";
import labels from "utils/labels";
import formData from "./formData";
import TopBar from "components/TopBar/TopBar";

interface ProductsCreateProps {
	isEdit?: boolean;
}

const ProductsCreate: FC<ProductsCreateProps> = ({ isEdit = false }) => {
	const { id } = useParams();
	const [form] = useForm<EntityProduct>();
	const navigate = useNavigate();
	const inputRef = useInputRef();

	const { data, isLoading, isFetching } = useGetOneProductsQuery(Number(id), { skip: !id });

	const [editProducts] = useUpdateProductsMutation();
	const [addProducts] = useAddNewProductsMutation();

	const measurementsOptions = useGetMeasurementsOptions();
	const productCategoriesOptions = useGetProductCategoriesOptions();
	const SSDCOptions = useSSDCOptions();

	const onFinish = (values: EntityProduct) => {
		isEdit
			? editProducts({ ...data, ...values }).then(() => navigate(authUrl.Index.Products.List.url))
			: addProducts(values).then(() => navigate(authUrl.Index.Products.List.url));
	};

	useEffect(() => {
		form.setFieldsValue({
			...data,
			measurementId: data?.measurement.id,
			categoryId: data?.productCategory.id,
			structuralSubdivisionCategoryId: data?.structuralSubdivisionCategory.id,
		});
	}, [data]);

	return (
		<>
			<TopBar>
				<PageTitle backUrl>{labels.common.editOrCreate(isEdit, "продукт")}</PageTitle>
			</TopBar>
			<FormLayout
				form={form}
				onFinish={onFinish}
				name="ProductsForm"
				formData={formData(measurementsOptions, productCategoriesOptions, SSDCOptions, !isEdit, inputRef)}
				initialValues={data}>
				<Button htmlType="submit" loading={isLoading || isFetching}>
					{labels.common.addOrSave(isEdit)}
				</Button>
			</FormLayout>
		</>
	);
};

export default ProductsCreate;
