import { Form, FormInstance } from "antd";
import Button from "components/Button/Button";
import Icons from "components/Icons/Icons";
import Input from "components/Input/Input";
import { FC, Key, ReactNode, useEffect, useState } from "react";
import { RequestTableRow } from "types/models/EntityProductCategory";
import concatClasses from "utils/concatClasses";
import styles from "./QantityCell.module.scss";

interface QuantityCellProps {
	title: ReactNode;
	editable: boolean;
	children: ReactNode;
	dataIndex: string;
	record: RequestTableRow;
	form: FormInstance;
	onAddDisabledKey: (key: string) => void;
	onRemoveDisabledKey: (key: string) => void;
	disabled: boolean;
}

export const getFormName = (key: Key) => `product-id-${key}`;

const QuantityCell: FC<QuantityCellProps> = ({
	editable,
	record,
	form,
	title,
	dataIndex,
	children,
	onRemoveDisabledKey,
	onAddDisabledKey,
	disabled,
	...restProps
}) => {
	const [quantity, setQuantity] = useState<number | undefined>(record?.quantity);
	const formName = record?.id !== undefined ? getFormName(record.id) : undefined;

	useEffect(() => {
		(quantity === 0 ? onAddDisabledKey : onRemoveDisabledKey)?.(formName);
	}, [quantity]);

	useEffect(() => {
		const quantity = form?.getFieldValue(formName);

		if (formName && quantity === 0) {
			setQuantity(quantity);
		}
	}, [form?.getFieldValue(formName)]);

	useEffect(() => {
		setQuantity(record?.quantity);
	}, [record?.quantity]);

	const increment = () => {
		const value = form?.getFieldValue(formName) + (record.measurementMultiplicity ?? 1);

		setQuantity(value);
		form?.setFieldValue(formName, value);
	};

	const decrement = () => {
		const decremented = form?.getFieldValue(formName) - (record.measurementMultiplicity ?? 1);
		const value = decremented < 0 ? 0 : decremented;

		setQuantity(value);
		form?.setFieldValue(formName, value);
	};

	return (
		<td {...restProps}>
			{editable && !record.isCat ? (
				<div className={styles.wrapper}>
					<Form.Item style={{ margin: 0 }} name={formName} initialValue={record.quantity} hidden>
						<Input />
					</Form.Item>
					{!disabled && <Button icon={<Icons.Minus />} isCircle onClick={decrement} />}
					<div className={concatClasses(styles.counter, disabled && styles.counter_disabled)}>{quantity}</div>
					{!disabled && <Button icon={<Icons.Plus />} isCircle onClick={increment} />}
				</div>
			) : (
				children
			)}
		</td>
	);
};

export default QuantityCell;
