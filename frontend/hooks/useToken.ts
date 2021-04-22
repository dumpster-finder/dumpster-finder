import { useSelector } from "react-redux";
import {
    refreshToken,
    tokenSelector,
    userIDSelector,
} from "../redux/slices/userSlice";
import { useAppDispatch } from "../redux/store";

/**
 * Returns the current token and a function to call if it fails
 */
export default function() {
    const dispatch = useAppDispatch();
    const token = useSelector(tokenSelector);
    const userID = useSelector(userIDSelector);
    const onTokenFailure = () =>
        dispatch(refreshToken(userID)).catch(e =>
            console.error(e, "Token refresh failed"),
        );

    return { token, onTokenFailure };
}
