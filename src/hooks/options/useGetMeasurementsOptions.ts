import { DefaultOptionType } from "antd/es/select";
import { useGetAllMeasurementsQuery } from "services/measurementsServices";

const useGetMeasurementsOptions = (): DefaultOptionType[] => {
	const { data } = useGetAllMeasurementsQuery({});

	return data
		? data.measurements.map((element) => ({
				key: element.id,
				value: element.id,
				label: element.name,
		  }))
		: [];
};

export default useGetMeasurementsOptions;
