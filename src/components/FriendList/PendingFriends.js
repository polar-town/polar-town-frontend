import { nanoid } from "nanoid";
import React, { useState } from "react";
import FriendRow from "./FriendRow";
import { TYPE } from "../../constants/friendList";

function PendingFriends() {
  const [pendingFriends, setPendingFriends] = useState([]);
  const data = [
    {
      name: "조은별",
      id: "62026c8514ae0f388ed66708",
      url: "https://lh3.googleusercontent.com/a/AATXAJxxbHrLYUxCeas7MEWa79xgPZVVMHek_XFrhypx=s96-c",
    },
    {
      name: "최 리",
      id: "62024632a669ed3ebbfbfe38",
      url: "https://lh3.googleusercontent.com/a/AATXAJxgk2MYxYmGTfM8LRWnEFbooyhzGrR7rJBpm3ve=s96-c",
    },
  ];
  return (
    <div>
      {data.map((friend) => {
        const key = nanoid();
        return (
          <FriendRow
            key={key}
            name={friend.name}
            id={friend.id}
            photo={friend.url}
            type={TYPE.PENDING_FRIEND}
          />
        );
      })}
    </div>
  );
}

export default PendingFriends;
