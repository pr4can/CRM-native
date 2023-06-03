import moment, { Moment } from "moment/moment";
import { Key, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import dateHelper from "utils/dateHelper";

const getNextWeekday = (date: Moment = moment()) => {
	const dayOfWeek = date.weekday();

	if (dayOfWeek === 5) return date.add(3, "d");
	if (dayOfWeek === 6) return date.add(2, "d");

	return date.add(1, "d");
};

const usePageDate = (defaultValue: Moment = moment()) => {
	const [query, setQuery] = useSearchParams();
	const [date, setDate] = useState<Moment>(
		query.get("date") ? moment(query.get("date")) : getNextWeekday(defaultValue)
	);

	useEffect(() => {
		const currentDate = query.get("date");

		if (!currentDate) {
			setQuery((query) => {
				query.set("date", dateHelper.toRequestDate(date));
				return query;
			});
		} else {
			setDate(moment(currentDate));
		}
	}, []);

	const changeDate = (date?: Moment | Key) => {
		setQuery((query) => {
			query.set("date", dateHelper.toRequestDate(date));
			return query;
		});
		setDate(date ? moment(date) : undefined);
	};

	return [date, changeDate] as const;
};

export default usePageDate;
