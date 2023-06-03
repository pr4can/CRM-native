import { DefaultOptionType } from "antd/es/select";
import { UserRole } from "types/models/EntityUser";

const useGetRoleOptions = (): DefaultOptionType[] => {
	return [
		{ key: UserRole.Admin, value: UserRole.Admin, label: "Администратор" },
		{ key: UserRole.SimpleUser, value: UserRole.SimpleUser, label: "Пользователь" },
	];
};

export default useGetRoleOptions;
