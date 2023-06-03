import locale from "antd/es/date-picker/locale/ru_RU";
import { DatePickerProps } from "components/DatePicker/DatePicker";

export const datePickerLocale: DatePickerProps["locale"] = {
	...locale,
	lang: {
		locale: "ru_RU",
		...locale.lang,
	},
};
