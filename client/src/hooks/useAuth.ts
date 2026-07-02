import { useSelector } from "react-redux";
import { authSelector } from "../store/reducers/auth/selectors";

const useAuth = () => useSelector(authSelector);

export default useAuth;