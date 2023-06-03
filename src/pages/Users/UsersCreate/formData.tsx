import { InputRef } from "antd";
import { DefaultOptionType } from "antd/es/select";
import { FormData } from "components/Form/Form";
import Input from "components/Input/Input";
import InputWithMask from "components/Input/InputWithMask";
import Select from "components/Select/Select";
import { Ref } from "react";
import { EntityUser } from "types/models/EntityUser";
import formHelper from "utils/formHelper";
import { required } from "utils/getRules";

const formData = (
	SSDCOptions: DefaultOptionType[],
	rolesOptions: DefaultOptionType[],
	inputRef: Ref<InputRef>
): FormData<EntityUser> => [
	{
		key: "name",
		label: "ФИО",
		type: Input,
		formItemProps: {
			rules: [required()],
		},
		typeProps: {
			ref: inputRef,
		},
	},
	{
		key: "password",
		label: "Пароль",
		type: Input,
		formItemProps: {
			rules: [required()],
		},
	},
	{
		key: "phone",
		label: "Телефон",
		formItemProps: {
			normalize: formHelper.transformPhone,
			rules: [required()],
		},
		type: (props) => <InputWithMask mask={"+79999999999"} {...props} />,
	},
	{
		key: "organization",
		label: "СП",
		type: Input,
		formItemProps: {
			rules: [required()],
		},
	},
	{
		key: "address",
		label: "Адрес",
		type: Input,
		formItemProps: {
			rules: [required()],
		},
	},
	{
		key: "structuralSubdivisionCategoryId",
		label: "Структурное подразделение",
		type: (props) => <Select options={SSDCOptions} {...props} />,
		formItemProps: {
			rules: [required()],
		},
	},
	{
		key: "role",
		label: "Роль",
		type: (props) => <Select options={rolesOptions} {...props} />,
		formItemProps: {
			rules: [required()],
		},
	},
];

export default formData;
