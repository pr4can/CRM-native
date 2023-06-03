import { InputRef } from "antd";
import { DefaultOptionType } from "antd/es/select";
import { FormData } from "components/Form/Form";
import Input from "components/Input/Input";
import Select from "components/Select/Select";
import { Ref } from "react";
import { EntityProduct } from "types/models/EntityProduct";
import { numberMoreNull, required } from "utils/getRules";

const formData = (
	measurementsOptions: DefaultOptionType[],
	productCategories: DefaultOptionType[],
	SSDCOptions: DefaultOptionType[],
	isCreateForm: boolean = false,
	inputRef: Ref<InputRef>
): FormData<EntityProduct> => [
	{
		key: "name",
		label: "Название",
		type: Input,
		formItemProps: {
			rules: [required()],
		},
		typeProps: {
			ref: inputRef,
		},
	},
	{
		key: "provider",
		label: "Поставщик",
		type: Input,
		formItemProps: {
			rules: [required()],
		},
	},
	{
		key: "measurementMultiplicity",
		label: "Кратность измерения",
		type: (props) => <Input type="number" {...props} />,
		formItemProps: {
			rules: [numberMoreNull()],
		},
	},
	{
		key: "measurementId",
		label: "Единица измерения",
		type: (props) => <Select options={measurementsOptions} {...props} />,
		formItemProps: {
			rules: [required()],
		},
	},
	{
		key: isCreateForm ? "structuralSubdivisionCategoryIds" : "structuralSubdivisionCategoryId",
		label: "Структурное подразделение",
		type: (props) => <Select options={SSDCOptions} mode={isCreateForm ? "multiple" : undefined} {...props} />,
		formItemProps: {
			rules: [required()],
		},
	},
	{
		key: "categoryId",
		label: "Категория продукта",
		type: (props) => <Select options={productCategories} {...props} />,
		formItemProps: {
			rules: [required()],
		},
	},
];

export default formData;
