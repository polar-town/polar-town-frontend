import { nanoid } from "nanoid";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import FriendRow from "./FriendRow";
import { TYPE } from "../../constants/friendList";
import { selectUserId } from "../../features/user/userSlice";
import { getPendingFriendList } from "../../api/friendlist";

function PendingFriends() {
  const [pendingFriends, setPendingFriends] = useState([]);
  const userId = useSelector(selectUserId);

  useEffect(async () => {
    const pendingFriendList = await getPendingFriendList(userId);
    setPendingFriends(pendingFriendList);
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
