import React from "react";
import proptypes from "prop-types";
import styled from "styled-components";
import { DateTime } from "luxon";

const StyledPostContainer = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  width: 100%;
  height: 100px;
  background: #67d9fd;
  margin-bottom: 10px;
  padding: 20px;
  border-radius: 10px;
`;

const StyledRightSection = styled.section`
  flex: 0.4;
  text-align: center;
  margin-right: 30px;
`;

const StyledName = styled.span`
  font-size: 20px;
  font-weight: 700;
  opacity: 0.7;
`;
const StyledMessage = styled.span`
  font-size: 15px;
  opacity: 0.7;
`;
const StyledDate = styled.span`
  font-size: 12px;
  opacity: 0.5;
`;

const StyledLeftSection = styled.section`
  display: flex;
  flex-direction: column;
`;

function MessageRow({ name, message, date }) {
  return (
    <StyledPostContainer>
      <StyledRightSection>
        <StyledName>{name}</StyledName>
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
  name: proptypes.string.isRequired,
  message: proptypes.string.isRequired,
  date: proptypes.string.isRequired,
};
