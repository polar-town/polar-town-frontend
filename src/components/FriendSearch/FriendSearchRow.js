import React, { useEffect } from "react";
import styled from "styled-components";
import proptypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import { selectUser, selectUserId } from "../../features/user/userSlice";
import { closeAll } from "../../features/modal/modalSlice";
import { updateTargetPendingFriendList } from "../../api/friendSearch";
import { TYPE, OPTION } from "../../constants/searchFriend";
import { EVENTS, LEFT_TYPE } from "../../constants/socketEvents";

import FriendProfile from "../FriendProfile/FriendProfile";
import GameModalButton from "../GameModal/GameModalButton";

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

function FriendSearchRow({
  friend,
  socket,
  userFriendList,
  userPendingFriendList,
}) {
  const { id: townId } = useParams();
  const user = useSelector(selectUser);
  const userId = useSelector(selectUserId);
  const { name, email, photo, id } = friend;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function checkFriendType(searchedId) {
    const isFriend = userFriendList.some((friend) => friend.id === searchedId);
    const isSent = friend.pendingFriendList.some(
      (friend) => friend.userId === userId,
    );
    const isPendingFriend = userPendingFriendList.some(
      (friend) => friend.id === searchedId,
    );

    return isFriend
      ? TYPE.MY_FRIEND
      : isSent
      ? TYPE.REQUEST_SENT
      : isPendingFriend
      ? TYPE.REQUEST_RECEIVED
      : TYPE.NOT_FRIEND;
  }

  function visitFriendTown() {
    socket.emit(EVENTS.LEFT, {
      prevTownId: townId,
      user,
      type: LEFT_TYPE.TRANSITION,
    });
    dispatch(closeAll());
    navigate(`/users/${id}`);
  }

  async function sendFriendRequest(e) {
    await updateTargetPendingFriendList(userId, email);
    e.target.textContent = OPTION.REQUEST_SENT;
    e.target.setAttribute("disabled", true);

    socket.emit(EVENTS.FRIEND_REQUEST, {
      to: email,
      userName: user.username,
      email: user.email,
    });
  }

  return (
    <FriendSearchRowContainer>
      <FriendProfile name={`${name}(${email})`} photo={photo} />
      {checkFriendType(id) === TYPE.MY_FRIEND && (
        <GameModalButton
          content={OPTION.MY_FRIEND}
          onSelect={visitFriendTown}
          disabled={townId === id}
        />
      )}
      {checkFriendType(id) === TYPE.REQUEST_SENT && (
        <GameModalButton content={OPTION.REQUEST_SENT} disabled={true} />
      )}
      {checkFriendType(id) === TYPE.REQUEST_RECEIVED && (
        <GameModalButton content={OPTION.REQUEST_RECEIVED} disabled={true} />
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
  socket: proptypes.object,
  userFriendList: proptypes.array,
  userPendingFriendList: proptypes.array,
};

export default FriendSearchRow;
