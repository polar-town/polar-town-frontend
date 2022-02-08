import proptypes from "proptypes";
import React, { useState } from "react";
import styled from "styled-components";

const StyledHalfModal = styled.div`
  margin: 0 auto;
`;

const StyledHalfHeaderDiv = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  cursor: pointer;
`;

const StyledHalfNavDiv = styled.div`
  width: 50%;
  line-height: 50px;
  text-align: center;
  border-radius: 10px 10px 0 0;
  background-color: ${(props) => (props.checked ? "#d7e5e4" : "#c9d6d5")};
`;

const StyledHalfContentDiv = styled.div`
  width: 100%;
  background-color: #d7e5e4;
  border-radius: 0 0 10px 10px;
  padding: 20px;
`;

function HalfModal({ category, children }) {
  const [showFirstContent, setShowFirstContent] = useState(true);

  return (
    <StyledHalfModal>
      <StyledHalfHeaderDiv>
        <StyledHalfNavDiv
          checked={showFirstContent}
          onClick={() => setShowFirstContent(true)}
        >
          {category[0]}
        </StyledHalfNavDiv>
        <StyledHalfNavDiv
          checked={!showFirstContent}
          onClick={() => setShowFirstContent(false)}
        >
          {category[1]}
        </StyledHalfNavDiv>
      </StyledHalfHeaderDiv>
      <StyledHalfContentDiv>
        {showFirstContent ? <div>{children[0]}</div> : <div>{children[1]}</div>}
      </StyledHalfContentDiv>
    </StyledHalfModal>
  );
}

HalfModal.propTypes = {
  category: proptypes.array,
  children: proptypes.string,
};

export default HalfModal;
