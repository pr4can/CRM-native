type Status = number;
type Message = string | undefined;
type OperationStatus = number;
type ResponseData = any | null;
type ErrorField = string | undefined;

export interface QueryError {
	data: {
		operationStatus: OperationStatus;
		responseData: ResponseData;
		description?: Message;
		// todo: только в сервисе авторизации.
		//  в каждом сервисе разного типа ошибки с бэка. привести к одному
		error?: ErrorField;
		title?: string;
	};
	status: Status;
}

interface QueryErrorHelper {
	(status: Status, data: QueryError["data"]): QueryError;
}

const queryError: QueryErrorHelper = (status, data) => {
	return {
		status,
		data: {
			...data,
			operationStatus: data.operationStatus ?? 0,
			responseData: data.responseData ?? undefined,
			message: data.description ?? undefined,
			error: data.error ?? undefined,
		},
	};
};

export default queryError;
