import React from "react";
import styled from "styled-components";

const StyledNotiCircle = styled.div`
  font-size: 25px;
  color: red;
`;

function NotificationCircle() {
  return (
    <StyledNotiCircle>
      <i className="fas fa-exclamation-circle" />
    </StyledNotiCircle>
  );
}

export default NotificationCircle;
