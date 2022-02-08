import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const StyledHeaderDiv = styled.div`
  width: 100vw;
  height: 60px;
  background: rgba(214, 245, 245, 0.5);
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const StyledImgWrapperDiv = styled.div`
  line-height: 60px;

  img {
    image-rendering: pixelated;
    vertical-align: middle;
    padding: 0 20px;
  }
`;

const StyledNavWrapperDiv = styled.div`
  i {
    color: var(--header-content);
    margin-right: 20px;
    margin-left: 10px;
    font-size: 20px;
    cursor: pointer;
  }
`;

function Header() {
  const navigate = useNavigate();

  return (
    <StyledHeaderDiv>
      <StyledImgWrapperDiv>
        <img src="images/logo.png" alt="logo" />
      </StyledImgWrapperDiv>
      <StyledNavWrapperDiv>
        <i
          className="fas fa-envelope"
          onClick={() => {
            navigate("/mail");
          }}
        ></i>
        <i className="fas fa-user-plus"></i>
        <i className="fas fa-user-friends"></i>
        <i className="fas fa-store"></i>
        <i className="fas fa-sign-out-alt"></i>
      </StyledNavWrapperDiv>
    </StyledHeaderDiv>
  );
}

export default Header;
