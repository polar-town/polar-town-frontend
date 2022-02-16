import { useDispatch } from "react-redux";
import axios from "../api/axios";
import { saveLoginUser } from "../features/user/userSlice";

function useRefreshToken() {
  const dispatch = useDispatch();

  async function refresh() {
    const response = await axios.get("/auth/refresh", {
      withCredentials: true,
    });
    const { accessToken, user } = response.data.result;
    dispatch(saveLoginUser({ accessToken, user }));
    return accessToken;
  }

  return refresh;
}

export default useRefreshToken;
