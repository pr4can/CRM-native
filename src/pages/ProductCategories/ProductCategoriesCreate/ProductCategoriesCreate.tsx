import { useForm } from "antd/lib/form/Form";
import Button from "components/Button/Button";
import FormLayout from "components/Form/Form";
import PageTitle from "components/PageTitle/PageTitle";
import { authUrl } from "config/path";
import useInputRef from "hooks/useInputRef";
import { FC, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
	useAddNewProductCategoriesMutation,
	useGetOneProductCategoriesQuery,
	useUpdateProductCategoriesMutation,
} from "services/productCategoriesServices";
import { EntityProductCategory } from "types/models/EntityProductCategory";
import labels from "utils/labels";
import formData from "./formData";
import TopBar from "components/TopBar/TopBar";

interface ProductCategoriesCreateProps {
	isEdit?: boolean;
}

const ProductCategoriesCreate: FC<ProductCategoriesCreateProps> = ({ isEdit = false }) => {
	const { id } = useParams();
	const [form] = useForm<EntityProductCategory>();
	const navigate = useNavigate();
	const inputRef = useInputRef();

	const { data, isLoading, isFetching } = useGetOneProductCategoriesQuery(Number(id), { skip: !id });

	const [editProductCategories] = useUpdateProductCategoriesMutation();
	const [addProductCategories] = useAddNewProductCategoriesMutation();

	const onFinish = (values: EntityProductCategory) => {
		isEdit
			? editProductCategories({ ...data, ...values }).then(() => navigate(authUrl.Index.ProductCategories.List.url))
			: addProductCategories(values).then(() => navigate(authUrl.Index.ProductCategories.List.url));
	};

	useEffect(() => {
		form.setFieldsValue(data);
	}, [data]);

	return (
		<>
			<TopBar>
				<PageTitle backUrl>{labels.common.editOrCreate(isEdit, "категорию продуктов")}</PageTitle>
			</TopBar>
			<FormLayout
				form={form}
				onFinish={onFinish}
				name="ProductCategoriesForm"
				formData={formData(inputRef)}
				initialValues={data}>
				<Button htmlType="submit" loading={isLoading || isFetching}>
					{labels.common.addOrSave(isEdit)}
				</Button>
			</FormLayout>
		</>
	);
};

export default ProductCategoriesCreate;
