import { FormInstance } from "antd";
import Button from "components/Button/Button";
import Icons from "components/Icons/Icons";
import { getFormName } from "pages/Requests/components/QuantityCell/QuantityCell";
import { FC } from "react";
import { RequestTableRow } from "types/models/EntityProductCategory";

interface ActionsCellProps {
	data: RequestTableRow;
	form: FormInstance;
	disabledKeys: string[];
	disabled?: boolean;
	hiddenText?: boolean;
}

const ActionsCell: FC<ActionsCellProps> = ({ data, form, disabledKeys, disabled, hiddenText = false }) => {
	const deleteQuantity = () => {
		form.setFieldValue(getFormName(data.id), 0);
	};

	return (
		<Button
			type={"text"}
			disabled={disabled || disabledKeys.includes(getFormName(data.id))}
			onClick={deleteQuantity}
			icon={<Icons.Delete />}>
			{!hiddenText && "Убрать из заявки"}
		</Button>
	);
};

export default ActionsCell;
