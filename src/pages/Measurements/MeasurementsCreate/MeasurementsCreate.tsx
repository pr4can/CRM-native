import { useForm } from "antd/lib/form/Form";
import Button from "components/Button/Button";
import FormLayout from "components/Form/Form";
import PageTitle from "components/PageTitle/PageTitle";
import TopBar from "components/TopBar/TopBar";
import { authUrl } from "config/path";
import useInputRef from "hooks/useInputRef";
import { FC, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
	useAddNewMeasurementsMutation,
	useGetOneMeasurementsQuery,
	useUpdateMeasurementsMutation,
} from "services/measurementsServices";
import { EntityMeasurement } from "types/models/EntityMeasurement";
import labels from "utils/labels";
import formData from "./formData";

interface MeasurementsCreateProps {
	isEdit?: boolean;
}

const MeasurementsCreate: FC<MeasurementsCreateProps> = ({ isEdit = false }) => {
	const { id } = useParams();
	const [form] = useForm<EntityMeasurement>();
	const navigate = useNavigate();
	const inputRef = useInputRef();

	const { data, isLoading, isFetching } = useGetOneMeasurementsQuery(Number(id), { skip: !id });

	const [editMeasurements] = useUpdateMeasurementsMutation();
	const [addMeasurements] = useAddNewMeasurementsMutation();

	const onFinish = (values: EntityMeasurement) => {
		isEdit
			? editMeasurements({ ...data, ...values }).then(() => navigate(authUrl.Index.Measurements.List.url))
			: addMeasurements(values).then(() => navigate(authUrl.Index.Measurements.List.url));
	};

	useEffect(() => {
		form.setFieldsValue(data);
	}, [data]);

	return (
		<>
			<TopBar>
				<PageTitle backUrl>{labels.common.editOrCreate(isEdit, "единицу измерения")}</PageTitle>
			</TopBar>
			<FormLayout
				form={form}
				onFinish={onFinish}
				name="MeasurementsForm"
				formData={formData(inputRef)}
				initialValues={data}>
				<Button htmlType="submit" loading={isLoading || isFetching}>
					{labels.common.addOrSave(isEdit)}
				</Button>
			</FormLayout>
		</>
	);
};

export default MeasurementsCreate;
