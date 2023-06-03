import { useForm } from "antd/lib/form/Form";
import Button from "components/Button/Button";
import FormLayout from "components/Form/Form";
import PageTitle from "components/PageTitle/PageTitle";
import TopBar from "components/TopBar/TopBar";
import { authUrl } from "config/path";
import useGetRoleOptions from "hooks/options/useGetRoleOptions";
import useSSDCOptions from "hooks/options/useSSDCOptions";
import useInputRef from "hooks/useInputRef";
import { FC, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAddNewUsersMutation, useGetOneUsersQuery, useUpdateUsersMutation } from "services/usersServices";
import { EntityUser } from "types/models/EntityUser";
import generatePassword from "utils/generateRandomPassword";
import labels from "utils/labels";
import formData from "./formData";

interface UsersCreateProps {
	isEdit?: boolean;
}

const UsersCreate: FC<UsersCreateProps> = ({ isEdit = false }) => {
	const { id } = useParams();
	const [form] = useForm<EntityUser>();
	const navigate = useNavigate();
	const inputRef = useInputRef();

	const { data, isLoading, isFetching } = useGetOneUsersQuery(Number(id), { skip: !id });

	const [editUsers] = useUpdateUsersMutation();
	const [addUsers] = useAddNewUsersMutation();

	const SSDCOptions = useSSDCOptions();
	const rolesOptions = useGetRoleOptions();

	const onFinish = (values: EntityUser) => {
		isEdit
			? editUsers({ ...data, ...values })
					.unwrap()
					.then(() => {
						navigate(authUrl.Index.Users.List.url);
					})
			: addUsers(values)
					.unwrap()
					.then(() => navigate(authUrl.Index.Users.List.url));
	};

	useEffect(() => {
		form.setFieldsValue({
			...data,
			structuralSubdivisionCategoryId: data?.structuralSubdivisionCategory.id,
		});
		!isEdit && form.setFieldValue("password", generatePassword());
	}, [data]);

	return (
		<>
			<TopBar>
				<PageTitle backUrl>{labels.common.editOrCreate(isEdit, "клиента")}</PageTitle>
			</TopBar>
			<FormLayout
				form={form}
				onFinish={onFinish}
				name="UsersForm"
				formData={formData(SSDCOptions, rolesOptions, inputRef)}
				initialValues={data}>
				<Button htmlType="submit" loading={isLoading || isFetching}>
					{labels.common.addOrSave(isEdit)}
				</Button>
			</FormLayout>
		</>
	);
};

export default UsersCreate;
