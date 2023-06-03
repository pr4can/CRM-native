import { InputRef } from "antd";
import Input from "components/Input/Input";
import { Ref } from "react";
import { EntityMeasurement } from "types/models/EntityMeasurement";
import { required } from "utils/getRules";
import { FormData } from "../../../components/Form/Form";

const formData = (inputRef: Ref<InputRef>): FormData<EntityMeasurement> => [
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
