import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { selectCokeCount } from "../../features/user/userSlice";

const StyledCokeCountContainer = styled.li`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--header-background);
  width: 200px;
  height: 60px;
  margin-top: 10px;
  margin-left: 10px;
  border-radius: 15px;
  border: 5px outset var(--header-content);

  img {
    width: 30px;
    image-rendering: pixelated;
  }

  span {
    margin-left: 20px;
    font-size: 30px;
  }
`;

function CokeCounter() {
  const cokeCount = useSelector(selectCokeCount);

  return (
    <StyledCokeCountContainer>
      <img src="/images/coke.png" />
      <span>{cokeCount}</span>
    </StyledCokeCountContainer>
  );
}

export default CokeCounter;
