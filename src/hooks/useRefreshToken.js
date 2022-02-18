import { useDispatch, useSelector } from "react-redux";
import axios from "../api/axios";
import { saveLoginUser } from "../features/user/userSlice";

const REFRESH_TOKEN = "token";

function useRefreshToken() {
  const dispatch = useDispatch();
  const { email: userEmail } = useSelector((state) => state.user.user);

  async function refresh() {
    const refreshToken = localStorage.getItem(REFRESH_TOKEN);
    const response = await axios.post(
      "/auth/refresh",
      { userEmail, refreshToken },
      {
        withCredentials: true,
      },
    );
    const { accessToken, user } = response.data.result;
    dispatch(saveLoginUser({ accessToken, user }));
    return accessToken;
  }

  return refresh;
}

export default useRefreshToken;
