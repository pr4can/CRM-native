import { DefaultOptionType } from "antd/es/select";

export enum RequestsStatus {
	AllRequests = "undefined",
	RequestsCreated = 1,
	RequestsIsNotCreated = 0,
}

const useGetRequestsStatusOptions = (): DefaultOptionType[] => {
	return [
		{ key: RequestsStatus.AllRequests, value: RequestsStatus.AllRequests, label: "Все заявки" },
		{ key: RequestsStatus.RequestsCreated, value: RequestsStatus.RequestsCreated, label: "Заявка создана" },
		{
			key: RequestsStatus.RequestsIsNotCreated,
			value: RequestsStatus.RequestsIsNotCreated,
			label: "Заявка не создана",
		},
	];
};

export default useGetRequestsStatusOptions;
