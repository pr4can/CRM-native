import moment, { Moment } from "moment";
import { Key } from "react";

const toRequestDate = (date: Moment | Key) => moment(date).format("YYYY-MM-DD");

const dateHelper = {
	toRequestDate,
};

export default dateHelper;
