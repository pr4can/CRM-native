import { Col, ColProps, Form, FormInstance, FormItemProps, FormProps, Row, RowProps } from "antd";
import { ColumnType } from "antd/es/table";
import { ColumnGroupType } from "antd/es/table/interface";
import Label from "components/Label/Label";
import { ComponentType, ReactNode, useEffect, useRef } from "react";
import styles from "./Form.module.scss";

export type FormElement<T extends object> = (ColumnGroupType<T> | ColumnType<T>) & {
	key: keyof T;
	label?: ReactNode;
	colProps?: ColProps;
	type?: ComponentType;
	typeProps?: object;
	formItemProps?: FormItemProps;
	order?: number;
};

export type FormData<T extends object> = FormElement<T>[];

interface FormLayoutProps<T extends object> extends FormProps<T> {
	form?: FormInstance<T>;
	formData?: FormData<T>;
	rowProps?: RowProps;
	children?: ReactNode | ReactNode[];
}

const FormLayout = <T extends object>({ formData, rowProps, children, form, ...props }: FormLayoutProps<T>) => {
	const inputRef = useRef(null);

	useEffect(() => {
		inputRef.current && inputRef.current.focus();
	}, [inputRef.current]);

	return (
		<Form className={styles.form} form={form} layout="vertical" {...props}>
			<Row className={styles.form__row} gutter={[60, 30]} {...rowProps}>
				{formData
					?.filter((item) => !!item?.type)
					.sort((a, b) => Number(a.order) - Number(b.order))
					.map(({ type, typeProps, formItemProps, label, colProps = { xs: 24, lg: 12, xl: 8 }, key }) => {
						const Component = type ? type : () => <></>;
						return (
							<Col key={key} {...colProps}>
								<Form.Item label={<Label>{label}</Label>} name={key} {...formItemProps}>
									<Component {...typeProps} />
								</Form.Item>
							</Col>
						);
					})}
			</Row>
			{children}
		</Form>
	);
};

export default FormLayout;
