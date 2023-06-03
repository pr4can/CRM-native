import { useForm } from "antd/es/form/Form";
import Button from "components/Button/Button";
import FormLayout from "components/Form/Form";
import PageTitle from "components/PageTitle/PageTitle";
import { authUrl } from "config/path";
import useInputRef from "hooks/useInputRef";
import { FC, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import {
	useAddNewSSDCMutation,
	useGetOneSSDCQuery,
	useUpdateSSDCMutation,
} from "services/structuralSubDivisionCategoriesServices";
import { EntityStructuralSubDivisionCategory } from "types/models/EntityStructuralSubDivisionCategory";
import labels from "utils/labels";
import formData from "./formData";
import TopBar from "components/TopBar/TopBar";

interface StructuralSubDivisionCategoriesCreateProps {
	isEdit?: boolean;
}

const StructuralSubDivisionCategoriesCreate: FC<StructuralSubDivisionCategoriesCreateProps> = ({ isEdit = false }) => {
	const { id } = useParams();
	const [form] = useForm<EntityStructuralSubDivisionCategory>();
	const navigate = useNavigate();
	const inputRef = useInputRef();

	const { data, isLoading, isFetching } = useGetOneSSDCQuery(Number(id), { skip: !id });

	const [editSSDC] = useUpdateSSDCMutation();
	const [addSSDC] = useAddNewSSDCMutation();

	const onFinish = (values: EntityStructuralSubDivisionCategory) => {
		isEdit
			? editSSDC({ ...data, ...values }).then(() => navigate(authUrl.Index.StructuralSubDivisionCategories.List.url))
			: addSSDC(values).then(() => navigate(authUrl.Index.StructuralSubDivisionCategories.List.url));
	};

	useEffect(() => {
		form.setFieldsValue(data);
	}, [data]);

	return (
		<>
			<TopBar>
				<PageTitle backUrl>{labels.common.editOrCreate(isEdit, "структурное подразделение")}</PageTitle>
			</TopBar>
			<FormLayout form={form} onFinish={onFinish} name="SSDCForm" formData={formData(inputRef)} initialValues={data}>
				<Button htmlType="submit" loading={isLoading || isFetching}>
					{labels.common.addOrSave(isEdit)}
				</Button>
			</FormLayout>
		</>
	);
};

export default StructuralSubDivisionCategoriesCreate;
