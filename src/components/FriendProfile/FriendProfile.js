import React from "react";
import proptypes from "prop-types";
import styled from "styled-components";

const ProfileContainer = styled.div`
  display: flex;
  align-items: center;
  z-index: 1;

  span {
    font-size: 16px;
  }
`;

const Photo = styled.div`
  background-image: ${(props) => `url("${props.url}")`};
  background-size: 100%;
  width: 45px;
  height: 45px;
  border-radius: 50%;
  margin: 0px 10px;
`;

function FriendProfile({ name, photo }) {
  return (
    <ProfileContainer>
      <Photo url={photo} />
      {name && <span>{name}</span>}
    </ProfileContainer>
  );
}

FriendProfile.propTypes = {
  name: proptypes.string,
  photo: proptypes.string.isRequired,
};

export default FriendProfile;
