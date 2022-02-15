import { nanoid } from "nanoid";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import FriendRow from "./FriendRow";
import { TYPE } from "../../constants/friendList";
import { getPendingFriendList } from "../../api/friendlist";

function PendingFriends() {
  const [pendingFriends, setPendingFriends] = useState([]);
  const { user } = useSelector((state) => state.user);

  useEffect(async () => {
    const pendingFriendList = await getPendingFriendList(user.id);
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
