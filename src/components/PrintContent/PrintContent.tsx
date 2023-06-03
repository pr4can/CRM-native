import { Col, Row } from "antd";
import { ColumnsType } from "antd/es/table";
import Title from "antd/es/typography/Title";
import React, { ReactNode } from "react";
import transformDataToPrintTable from "utils/transformDataToPrintTable/transformDataToPrintTable";

interface PrintContentProps<T extends object> {
	data: T[];
	columns: ColumnsType<T>;
	title?: ReactNode;
}

const PrintContent = <T extends object>({ columns, title, data }: PrintContentProps<T>) => {
	return (
		<Row gutter={[0, 20]}>
			{title && (
				<Col span={24}>
					<Title level={2} style={{ textAlign: "center" }}>
						{title}
					</Title>
				</Col>
			)}
			<Col span={24}>{transformDataToPrintTable(data, columns)}</Col>
		</Row>
	);
};

export default PrintContent;
