import { useMemo, useState } from "react";

export enum SortType {
	NotSet = undefined,
	Ascend = 0,
	Descend = 1,
}

export interface ISort<T extends Record<string, any> = Record<string, any>> {
	sortColumnName: keyof T;
	typeSort: SortType;
}

interface UseSortArgs<T extends Record<string, any>> {
	withPostFix?: boolean;
	defaultSort?: ISort<T>;
}

const useSort = <T extends Record<string, any> = Record<string, any>>({
	withPostFix = true,
	defaultSort,
}: UseSortArgs<T> = {}) => {
	const [sort, setSort] = useState<ISort<T>>(defaultSort ?? { sortColumnName: "", typeSort: SortType.NotSet });

	const handleSortChange = (sortColumnName: string, typeSort: SortType) => {
		setSort({ sortColumnName, typeSort });
	};

	const sortValue = useMemo(() => {
		return { [withPostFix ? `${sort.sortColumnName as string}SortType` : sort.sortColumnName]: sort.typeSort };
	}, [sort]);

	return { sort, sortValue, handleSortChange };
};

export default useSort;
