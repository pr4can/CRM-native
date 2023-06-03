import { useAppSelector } from "store";
import { AuthState } from "store/slices/userSlice";

interface UseAuthUserReturn extends AuthState {}

const useAuthUser = (): UseAuthUserReturn => {
	return useAppSelector((state) => state.user);
};

export default useAuthUser;
