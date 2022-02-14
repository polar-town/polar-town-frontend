import React from "react";
import styled from "styled-components";

const StyledNotiCircle = styled.div`
  font-size: 22px;
  color: red;
  margin-left: 5px;
`;

function NotificationCircle() {
  return (
    <StyledNotiCircle>
      <i className="fas fa-exclamation-circle" />
    </StyledNotiCircle>
  );
}

export default NotificationCircle;
