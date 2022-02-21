import { nanoid } from "nanoid";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import FriendRow from "./FriendRow";
import { TYPE } from "../../constants/friendList";
import { getPendingFriendList } from "../../api/friendlist";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import useLogout from "../../hooks/useLogout";

function PendingFriends() {
  const [pendingFriends, setPendingFriends] = useState([]);
  const { user } = useSelector((state) => state.user);
  const axiosInstance = useAxiosPrivate();
  const logout = useLogout();

  useEffect(async () => {
    try {
      const pendingFriendList = await getPendingFriendList({
        userId: user.id,
        axiosInstance,
      });
      setPendingFriends(pendingFriendList);
    } catch (error) {
      console.error(error.response?.status);
      if (error.response?.status === 401) {
        logout();
      }
    }
  }, []);

  return (
    <div>
      {!!pendingFriends?.length &&
        pendingFriends.map((friend) => {
          const key = nanoid();
          return (
            <FriendRow
              key={key}
              friend={friend}
              type={TYPE.PENDING_FRIEND}
              handleResponse={setPendingFriends}
            />
          );
        })}
    </div>
  );
}

export default PendingFriends;
