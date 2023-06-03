import { apiPath } from "config/api";
import { EntityMeasurement, EntityMeasurementResponse } from "types/models/EntityMeasurement";
import { baseApi } from "./baseService";

export const measurementsService = baseApi.injectEndpoints({
	endpoints: (builder) => ({
		getAllMeasurements: builder.query<EntityMeasurementResponse, object>({
			query: (params) => ({
				url: `${apiPath.Measurements}`,
				params,
			}),
			providesTags: ["Measurements"],
		}),
		getOneMeasurements: builder.query<EntityMeasurement, number>({
			query: (id) => ({
				url: `${apiPath.Measurements}/${id}`,
			}),
			providesTags: ["Measurements"],
		}),
		addNewMeasurements: builder.mutation<string, EntityMeasurement>({
			query: (body) => ({
				url: `${apiPath.Measurements}`,
				method: "POST",
				body,
			}),
			invalidatesTags: ["Measurements"],
		}),
		deleteMeasurements: builder.mutation<string, number>({
			query: (id) => ({
				url: `${apiPath.Measurements}/${id}`,
				method: "DELETE",
			}),
			invalidatesTags: ["Measurements"],
		}),
		updateMeasurements: builder.mutation<string, EntityMeasurement>({
			query: (body) => ({
				url: `${apiPath.Measurements}/${body.id}`,
				method: "PUT",
				body,
			}),
			invalidatesTags: ["Measurements"],
		}),
	}),
	overrideExisting: true,
});

export const {
	useAddNewMeasurementsMutation,
	useDeleteMeasurementsMutation,
	useGetAllMeasurementsQuery,
	useGetOneMeasurementsQuery,
	useUpdateMeasurementsMutation,
} = measurementsService;
