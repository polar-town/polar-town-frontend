import React, { useState } from "react";
import styled from "styled-components";

const StyledCokeCountContainer = styled.li`
  position: absolute;
  display: flex;
  align-items: center;
  background-color: var(--header-background);
  width: 200px;
  height: 60px;
  margin-top: 10px;
  margin-left: 10px;
  border-radius: 15px;
  border: 5px solid var(--header-content);

  img {
    margin-left: 30px;
    width: 30px;
  }

  span {
    margin-left: 30px;
    font-size: 30px;
  }
`;

function CokeCount() {
  const [cokeCount, setCokeCount] = useState(10);

  return (
    <StyledCokeCountContainer>
      <img
        onClick={() => {
          setCokeCount((prev) => prev + 1);
        }}
        src="/images/coke.png"
      />
      <span>{cokeCount}</span>
    </StyledCokeCountContainer>
  );
}

export default CokeCount;
