import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { selectCokeCount } from "../../features/user/userSlice";

const StyledCokeCountContainer = styled.li`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgb(231, 194, 184, 0.7);
  width: 180px;
  height: 60px;
  margin: 15px 0 0 15px;
  border-radius: 13px;

  img {
    width: 28px;
    image-rendering: pixelated;
  }

  span {
    margin-left: 10px;
    font-size: 25px;
  }

  .count {
    padding-top: 3px;
  }
`;

function CokeCounter() {
  const cokeCount = useSelector(selectCokeCount);

  return (
    <StyledCokeCountContainer>
      <img src="/images/coke.png" />
      <span>x</span>
      <span className="count">{cokeCount}</span>
    </StyledCokeCountContainer>
  );
}

export default CokeCounter;
