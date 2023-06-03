export interface EntityMeasurement {
	id?: number | null;
	name: string | null;
}

export interface EntityMeasurementResponse {
	measurements: EntityMeasurement[] | null;
}

export interface EntityMeasurementTable extends EntityMeasurement {
	key: string | number;
}
