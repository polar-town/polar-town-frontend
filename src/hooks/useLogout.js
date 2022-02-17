import { useDispatch, useSelector } from "react-redux";
import { userLogout } from "../api/auth";
import { resetLoginUser } from "../features/user/userSlice";
import useGapi from "./useGapi";

function useLogout() {
  const gapi = useGapi();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  async function logout() {
    try {
      const googleAuth = gapi.auth2.getAuthInstance();
      googleAuth.signOut().then(() => {
        googleAuth.disconnect();
      });

      await userLogout(user);
      dispatch(resetLoginUser());
    } catch (error) {
      console.error(error);
    }
  }

  return logout;
}

export default useLogout;
