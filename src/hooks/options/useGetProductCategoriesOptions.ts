import { DefaultOptionType } from "antd/es/select";
import { useGetAllProductCategoriesQuery } from "services/productCategoriesServices";

const useGetProductCategoriesOptions = (): DefaultOptionType[] => {
	const { data } = useGetAllProductCategoriesQuery({});

	return data
		? data.productCategories.map((element) => ({
				key: element.id,
				value: element.id,
				label: element.name,
		  }))
		: [];
};

export default useGetProductCategoriesOptions;
