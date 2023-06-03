import {
	EntityMeasurement,
	EntityMeasurementResponse,
	EntityMeasurementTable,
} from "types/models/EntityMeasurement";

export const measurementsSerializer = (data?: EntityMeasurementResponse): EntityMeasurementTable[] => {
	return data
		? data.measurements.map((element: EntityMeasurement, index: number) => ({
				...element,
				key: index,
		  }))
		: [];
};
