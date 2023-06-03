import buildUrl from "utils/buildUrl";

export enum MeasurementsPath {
	List = "list",
	Edit = "edit/:id",
	New = "new",

	Measurements = "Measurements",
}

export const measurementsUrl = buildUrl(MeasurementsPath, {
	Measurements: {
		List: {},
		New: {},
		Edit: {},
	},
});
