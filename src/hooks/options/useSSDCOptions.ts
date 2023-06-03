import { DefaultOptionType } from "antd/es/select";
import { useGetAllSSDCQuery } from "services/structuralSubDivisionCategoriesServices";

const useSSDCOptions = (): DefaultOptionType[] => {
	const { data } = useGetAllSSDCQuery({});

	return data
		? data.structuralSubdivisions.map((element) => ({
				key: element.id,
				value: element.id,
				label: element.name,
		  }))
		: [];
};

export default useSSDCOptions;
