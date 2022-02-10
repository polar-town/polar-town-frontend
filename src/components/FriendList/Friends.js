import { nanoid } from "nanoid";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import protypes from "prop-types";
import FriendRow from "./FriendRow";
import { TYPE } from "../../constants/friendList";
import { selectUserId } from "../../features/user/userSlice";
import { getFriendList } from "../../api/friendlist";

function Friends({ visitFriend, toggleFriendList }) {
  const [friends, setFriends] = useState([]);
  const userId = useSelector(selectUserId);

  useEffect(async () => {
    const friendList = await getFriendList(userId);
    setFriends(friendList);
  }, []);

  return (
    <div>
      {!!friends?.length &&
        friends.map((friend) => {
          const key = nanoid();
          return (
            <FriendRow
              key={key}
              name={friend.name}
              id={friend.id}
              photo={friend.photo}
              email={friend.email}
              type={TYPE.MY_FRIEND}
              visitFriend={visitFriend}
              toggleFriendList={toggleFriendList}
              handleDeletion={setFriends}
            />
          );
        })}
    </div>
  );
}

export default Friends;

Friends.propTypes = {
  visitFriend: protypes.func.isRequired,
  toggleFriendList: protypes.func.isRequired,
};
