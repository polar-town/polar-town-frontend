import React from "react";
import styled from "styled-components";
import proptypes from "prop-types";
import { nanoid } from "nanoid";
import GameModalButton from "../GameModal/GameModalButton";
import { OPTION, TYPE } from "../../constants/friendList";
import { useSelector } from "react-redux";
import { selectUserId } from "../../features/user/userSlice";
import {
  deleteFriend,
  addFriendList,
  deletePendingFriend,
} from "../../api/friendlist";

const ProfileContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  padding-bottom: 20px;
  margin-bottom: 20px;
`;

const ProfileRigntSection = styled.section`
  display: flex;
  align-items: center;

  span {
    font-size: 18px;
  }
`;

const ProfileLeftSection = styled.section`
  button {
    margin-left: 10px;
  }
`;

const Photo = styled.div`
  background-image: ${(props) => `url("${props.url}")`};
  background-size: 100%;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin: 0px 10px;
`;

const VISIT = 0;
const ACCEPT = 0;

function FriendRow({
  friend,
  type,
  visitFriend,
  toggleFriendList,
  handleDeletion,
  handleResponse,
}) {
  const userId = useSelector(selectUserId);
  const { name, email, photo, id } = friend;

  const visitFriendTown = () => {
    visitFriend(id);
    toggleFriendList(false);
  };
  const onDeletion = async () => {
    await deleteFriend(userId, email);
    handleDeletion((prev) => {
      return prev.filter((friend) => friend.id !== id);
    });
  };
  const acceptFriendRequest = async () => {
    await addFriendList(userId, email);
    handleResponse((prev) => {
      return prev.filter((pendingFriend) => pendingFriend.id !== id);
    });
  };
  const declineFriendRequest = async () => {
    await deletePendingFriend(userId, email);
    handleResponse((prev) => {
      return prev.filter((pendingFriend) => pendingFriend.id !== id);
    });
  };

  return (
    <ProfileContainer>
      <ProfileRigntSection>
        <Photo url={photo} />
        <span>{name}</span>
      </ProfileRigntSection>
      <ProfileLeftSection>
        {type === TYPE.MY_FRIEND &&
          OPTION.MY_FRIEND.map((option) => {
            const key = nanoid();
            const handleSelect =
              option === OPTION.MY_FRIEND[VISIT] ? visitFriendTown : onDeletion;

            return (
              <GameModalButton
                key={key}
                content={option}
                onSelect={handleSelect}
              />
            );
          })}
        {type === TYPE.PENDING_FRIEND &&
          OPTION.PENDING_FRIEND.map((option) => {
            const key = nanoid();
            const handleSelect =
              option === OPTION.PENDING_FRIEND[ACCEPT]
                ? acceptFriendRequest
                : declineFriendRequest;

            return (
              <GameModalButton
                key={key}
                content={option}
                onSelect={handleSelect}
              />
            );
          })}
      </ProfileLeftSection>
    </ProfileContainer>
  );
}

FriendRow.propTypes = {
  friend: proptypes.object.isRequired,
  type: proptypes.string.isRequired,
  toggleFriendList: proptypes.func,
  visitFriend: proptypes.func,
  handleDeletion: proptypes.func,
  handleResponse: proptypes.func,
};

export default FriendRow;
