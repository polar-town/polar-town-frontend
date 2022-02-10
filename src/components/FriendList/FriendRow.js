import React from "react";
import styled from "styled-components";
import proptypes from "prop-types";
import GameModalButton from "../GameModal/GameModalButton";
import { OPTION, TYPE } from "../../constants/friendList";
import { nanoid } from "nanoid";

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

function FriendRow({ name, id, photo, type }) {
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
            return <GameModalButton key={key} content={option} />;
          })}
        {type === TYPE.PENDING_FRIEND &&
          OPTION.PENDING_FRIEND.map((option) => {
            const key = nanoid();
            return <GameModalButton key={key} content={option} />;
          })}
      </ProfileLeftSection>
    </ProfileContainer>
  );
}

FriendRow.propTypes = {
  name: proptypes.string.isRequired,
  id: proptypes.string.isRequired,
  photo: proptypes.string.isRequired,
  type: proptypes.string.isRequired,
};

export default FriendRow;
