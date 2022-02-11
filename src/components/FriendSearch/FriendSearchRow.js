import React from "react";
import styled from "styled-components";
import proptypes from "prop-types";
import { useSelector } from "react-redux";
import FriendProfile from "../FriendProfile/FriendProfile";
import GameModalButton from "../GameModal/GameModalButton";
import { selectUserId, selectFriendList } from "../../features/user/userSlice";
import { updateTargetPendingFriendList } from "../../api/friendSearch";
import { TYPE, OPTION } from "../../constants/searchFriend";

const FriendSearchRowContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  padding-bottom: 20px;
  margin-bottom: 20px;
  padding: 15px;
`;

function FriendSearchRow({ friend, visitFriend, toggleFriendSearch }) {
  const userId = useSelector(selectUserId);
  const { name, email, photo, id, iceCount } = friend;
  const userFriendList = useSelector(selectFriendList);

  function checkFriendType(searchedId) {
    const isFriend = userFriendList.some((friend) => friend.id === searchedId);

    return isFriend ? TYPE.MY_FRIEND : TYPE.NOT_FRIEND;
  }

  function visitFriendTown() {
    visitFriend(id, iceCount);
    toggleFriendSearch(false);
  }

  async function sendFriendRequest(e) {
    await updateTargetPendingFriendList(userId, email);
    e.target.textContent = OPTION.REQUEST_DONE;
  }

  return (
    <FriendSearchRowContainer>
      <FriendProfile name={`${name}(${email})`} photo={photo} />
      {checkFriendType(id) === TYPE.MY_FRIEND && (
        <GameModalButton
          content={OPTION.MY_FRIEND}
          onSelect={visitFriendTown}
        />
      )}
      {checkFriendType(id) === TYPE.NOT_FRIEND && (
        <GameModalButton
          content={OPTION.NOT_FRIEND}
          onSelect={sendFriendRequest}
        />
      )}
    </FriendSearchRowContainer>
  );
}

FriendSearchRow.propTypes = {
  friend: proptypes.object.isRequired,
  visitFriend: proptypes.func,
  toggleFriendSearch: proptypes.func,
};

export default FriendSearchRow;
