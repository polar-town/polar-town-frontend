import { useDispatch } from "react-redux";
import axios from "../api/axios";
import { saveLoginUser } from "../features/user/userSlice";

const REFRESH_TOKEN = "token";

function useRefreshToken() {
  const dispatch = useDispatch();

  async function refresh() {
    const refreshToken = localStorage.getItem(REFRESH_TOKEN);
    const response = await axios.post(
      "/auth/refresh",
      { refreshToken },
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
