import { CaretDownOutlined, CaretUpOutlined } from "@ant-design/icons";
import { DefaultOptionType } from "antd/es/select";
import useDebounce from "hooks/useDebounce";
import { ISort, SortType } from "hooks/useSort";
import { FC, useEffect, useState } from "react";
import concatClasses from "utils/concatClasses";
import InputFilter from "../TableHeaderController/components/InputFilter";
import SelectFilter from "../TableHeaderController/components/SelectFilter";
import styles from "./TableHeaderController.module.scss";

interface TableHeaderControllerProps {
	title: string;
	propertyName?: string;
	inputFilter?: boolean;
	selectFilter?: boolean;
	selectFilterOptions?: DefaultOptionType[];
	handleFilterChange?: (key: string, value: string) => void;
	sorting?: boolean;
	sort?: ISort;
	handleSortChange?: (sortColumnName: string, typeSort: SortType) => void;
}

const TableHeaderController: FC<TableHeaderControllerProps> = ({
	title,
	propertyName,
	inputFilter = false,
	selectFilter = false,
	selectFilterOptions,
	handleFilterChange,
	sorting = false,
	sort,
	handleSortChange,
}) => {
	const [searchValue, setSearchValue] = useState<string | undefined>();
	const value = useDebounce(searchValue);

	useEffect(() => {
		value !== undefined && handleFilterChange?.(propertyName, value);
	}, [value]);

	const changeSort = () => {
		if (sort?.sortColumnName === propertyName) {
			if (sort?.typeSort === SortType.Ascend) handleSortChange?.(propertyName, SortType.Descend);
			if (sort?.typeSort === SortType.Descend) handleSortChange?.(propertyName, SortType.NotSet);
			if (sort?.typeSort === SortType.NotSet) handleSortChange?.(propertyName, SortType.Ascend);
		} else handleSortChange?.(propertyName, SortType.Ascend);
	};

	return (
		<div className={styles.filterHead}>
			<div className={styles.filterHead__title}>
				{title}
				{sorting && (
					<div className={styles.sort} onClick={changeSort}>
						<CaretUpOutlined
							className={concatClasses(
								styles.sort__arrow,
								styles.sort__arrow_up,
								sort?.sortColumnName === propertyName &&
									sort?.typeSort === SortType.Descend &&
									styles.sort__arrow__active
							)}
						/>
						<CaretDownOutlined
							className={concatClasses(
								styles.sort__arrow,
								styles.sort__arrow_down,
								sort?.sortColumnName === propertyName &&
									sort?.typeSort === SortType.Ascend &&
									styles.sort__arrow__active
							)}
						/>
					</div>
				)}
			</div>
			{inputFilter && <InputFilter setSearchValue={setSearchValue} />}
			{selectFilter && <SelectFilter setSearchValue={setSearchValue} options={selectFilterOptions} />}
		</div>
	);
};

export default TableHeaderController;
