import { InputRef } from "antd";
import Input from "components/Input/Input";
import { Ref } from "react";
import { EntityStructuralSubDivisionCategory } from "types/models/EntityStructuralSubDivisionCategory";
import { required } from "utils/getRules";
import { FormData } from "../../../components/Form/Form";

const formData = (inputRef: Ref<InputRef>): FormData<EntityStructuralSubDivisionCategory> => [
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
];

export default formData;
