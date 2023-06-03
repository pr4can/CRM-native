const transformPhone = (value: string) => value.replace(/[^+^\d]/g, "").slice(0, 12);

const formHelper = {
	transformPhone,
};

export default formHelper;
