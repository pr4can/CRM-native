import { useMemo, useState } from "react";

type FilterObject<T> = {
	[P in keyof T]?: string | boolean | undefined;
};

const useFilter = <T>(initialFilter: FilterObject<T> = {}) => {
	const [filter, setFilter] = useState<FilterObject<T>>(initialFilter);

	const handleFilterChange = (key: string, value: string | boolean) => {
		setFilter({ ...filter, [key]: value });
	};

	const filterQuery = useMemo(() => {
		const filterCopy = { ...filter };
		for (let key in filterCopy) {
			if (filterCopy[key] === "") {
				delete filterCopy[key];
			}
		}
		return filterCopy;
	}, [filter]);

	return { filter, handleFilterChange, filterQuery };
};

export default useFilter;
