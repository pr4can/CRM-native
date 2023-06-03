import { isRejectedWithValue, Middleware, MiddlewareAPI } from "@reduxjs/toolkit";
import { message } from "antd";
import { QueryError } from "utils/queryError";

export type ErrorHandler = (error: QueryError) => void;

type ErrorType = QueryError | undefined;

const unknownError = "Неизвестная ошибка";

const errorMessage = (error: QueryError) => error.data.description || unknownError;

const errorCodeToHandler: Record<number, ErrorHandler> = {
	401: (error) => message.error(errorMessage(error)),
	403: (error) => message.error(errorMessage(error)),
};

/**
 * Выводить все сообщения об ошибках (по умолчанию: `unknownError`);<br/>
 * `true` - выводить только с сообщением; `false` - выводить все;<br/>
 * Ошибки из `errorCodeToHandler` выводятся в любом случае<br/>
 **/
const onlyErrorsWithMessages = false;

const defaultErrorHandler: ErrorHandler = (error) => message.error(errorMessage(error));

const errorHandler: Middleware = (_: MiddlewareAPI) => (next) => (action) => {
	if (isRejectedWithValue(action)) {
		const error = action.payload as ErrorType;

		if (error) {
			const handler = errorCodeToHandler[error.status];

			onlyErrorsWithMessages
				? (error.data.description || handler) && (handler ?? defaultErrorHandler)(error)
				: (handler ?? defaultErrorHandler)(error);
			// eslint-disable-next-line no-console
			console.error(action, error);
		}
	}

	return next(action);
};

export default errorHandler;
