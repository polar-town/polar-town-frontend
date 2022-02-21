import { useDispatch } from "react-redux";
import { resetLoginUser } from "../features/user/userSlice";
import useGapi from "./useGapi";

const REFRESH_TOKEN = "token";

function useLogout() {
  const gapi = useGapi();
  const dispatch = useDispatch();

  async function logout() {
    const googleAuth = gapi.auth2.getAuthInstance();
    googleAuth.signOut().then(() => {
      googleAuth.disconnect();
    });

    localStorage.clear(REFRESH_TOKEN);
    dispatch(resetLoginUser());
  }

  return logout;
}

export default useLogout;
