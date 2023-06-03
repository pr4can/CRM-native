const dash = "—";

const common = {
	addOrSave: (isEdit: boolean = false) => `${isEdit ? "Сохранить" : "Добавить"}`,
	editOrCreate: (isEdit: boolean = false, s: string) => `${isEdit ? "Редактировать" : "Добавить"} ${s}`,
} as const;

const labels = {
	dash,
	common,
};

export default labels;
