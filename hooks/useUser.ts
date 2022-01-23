import useStore from "../store/useStore";
import User from "../types/user";

const useUser = () => {
	const user: User = useStore((state) => state.user);
	return user;
};

export default useUser;
