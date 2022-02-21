import React from "react";
import proptypes from "prop-types";
import styled from "styled-components";
import { DateTime } from "luxon";
import FriendProfile from "../FriendProfile/FriendProfile";

const StyledPostContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  height: 75px;
  background: rgba(39, 114, 114, 0.1);
  margin-bottom: 10px;
  border-radius: 8px;
`;

const StyledRightSection = styled.section`
  width: 120px;
  margin-right: 10px;
  padding: 16px 5px;
  border-right: 1px solid #d6f6f6;
`;

const StyledMessage = styled.span`
  font-size: 15px;
  opacity: 0.7;
`;

const StyledDate = styled.span`
  font-size: 13px;
  opacity: 0.5;
`;

const StyledLeftSection = styled.section`
  display: flex;
  flex-direction: column;
  padding: 5px 5px;
  width: 320px;
`;

function MessageRow({ post }) {
  const { name, message, date, photo } = post;

  return (
    <StyledPostContainer>
      <StyledRightSection>
        <FriendProfile name={name} photo={photo} />
      </StyledRightSection>
      <StyledLeftSection>
        <StyledMessage>{message}</StyledMessage>
        <StyledDate>{DateTime.fromISO(date).toFormat("FF")}</StyledDate>
      </StyledLeftSection>
    </StyledPostContainer>
  );
}

export default MessageRow;

MessageRow.propTypes = {
  post: proptypes.object.isRequired,
};
