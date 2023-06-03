import { RuleObject } from "antd/lib/form";

export const numbersValidate = (message: string = "Допускаются только цифры") => ({
	validator: async (_: RuleObject, names: string) => {
		if (!/^(0|[1-9]\d*)$/.test(names)) {
			return Promise.reject(new Error(message));
		}
	},
});

export const required = (message: string = "Обязательное поле") => ({
	required: true,
	message,
});

export const isNumber = (message: string = "Введите число") => ({
	validator: async (_: RuleObject, number: string) =>
		Number.isNaN(Number(number)) ? Promise.reject(new Error(message)) : undefined,
});

export const numberMoreNull = (message: string = "Введите допустимое значение") => ({
	validator: async (_: RuleObject, measurementMultiplicity: number) => {
		if (!measurementMultiplicity || measurementMultiplicity < 0) {
			return Promise.reject(new Error("Введите допустимое значение"));
		}
	},
});

export const emailValidate = () => ({
	message: "Введите корректный E-mail",
	pattern: /.+@.+\..+/i,
});

export const phoneValidate = () => ({
	validator: async (_: RuleObject, names: string) => {
		if (names) {
			const val = names.replace(/[_ ]/g, "").length;
			if (val < 12) {
				return Promise.reject(new Error("Введите номер полностью"));
			}
		}
	},
});

export const onlyLettersValidation = (message: string = "Поле должно содержать буквы") => ({
	message,
	pattern: /[a-zA-Zа-яА-Я]/g,
});
