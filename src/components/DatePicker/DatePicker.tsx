import { DatePicker as DatePickerAntd, DatePickerProps as DatePickerPropsAntd } from "antd";
import { PickerDateProps } from "antd/es/date-picker/generatePicker";
import { datePickerLocale } from "config/locale";
import dayjs, { Dayjs } from "dayjs";
import moment, { Moment } from "moment";
import { CSSProperties, FC } from "react";
import concatClasses from "utils/concatClasses";
import styles from "./DatePicker.module.scss";

export interface DatePickerProps extends Omit<DatePickerPropsAntd, "value" | "onChange"> {
	value?: Moment;
	onChange?: (value: Moment, dateString: string) => void;
	width?: CSSProperties["width"];
	minWidth?: boolean;
	accent?: boolean;
}

const DatePicker: FC<DatePickerProps> = ({
	className,
	dropdownClassName,
	value,
	onChange,
	format = "DD.MM.YYYY",
	picker,
	width,
	minWidth = false,
	accent,
	...props
}) => {
	const onHandleChange: PickerDateProps<Dayjs>["onChange"] = (value, dateString) => {
		onChange?.(moment(value.toISOString()), dateString);
	};

	return (
		<DatePickerAntd
			style={!!width ? { width: "100%", [minWidth ? "minWidth" : "maxWidth"]: width } : undefined}
			value={dayjs(value?.toISOString())}
			format={format}
			onChange={onHandleChange}
			className={concatClasses(className, styles.datePicker, accent && styles.datePicker_accent)}
			popupClassName={concatClasses(dropdownClassName, styles.dropdownClassName)}
			{...props}
			allowClear={false}
			locale={datePickerLocale}
		/>
	);
};

export default DatePicker;
