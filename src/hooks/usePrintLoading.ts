import { ReportType } from "components/PrintBlock/PrintBlock";
import { useState } from "react";

const usePrintLoading = () => {
	const [loadingTypes, setLoadingType] = useState<ReportType[]>([]);

	const addLoadingType = (type?: ReportType) => {
		setLoadingType((prev) => [...prev, type]);
	};

	const removeLoadingType = (type?: ReportType) => {
		setLoadingType((prev) => prev.filter((i) => i !== type));
	};

	return [loadingTypes, { addLoadingType, removeLoadingType }] as const;
};

export default usePrintLoading;
