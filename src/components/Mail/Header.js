import React, { useRef } from "react";
import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import styled from "styled-components";

const StyledSectionDiv = styled.div`
  position: relative;
  padding: 10px;
  right: 0;
  left: 0;
  margin: 10px auto 0;
  width: 500px;

  .section > button > span {
    font-size: 20px;
    font-weight: 700;
  }
}
`;

function Header() {
  const promotionRef = useRef();
  const spamRef = useRef();
  const trashRef = useRef();

  return (
    <StyledSectionDiv>
      <Box sx={{ width: 500 }}>
        <BottomNavigation showLabels className="section">
          <BottomNavigationAction
            ref={promotionRef}
            onClick={() => {
              promotionRef.current.style.color = "#1B72E8";
              spamRef.current.style.color = "#666666";
              trashRef.current.style.color = "#666666";
            }}
            label="Promotion"
          />
          <BottomNavigationAction
            ref={spamRef}
            onClick={() => {
              promotionRef.current.style.color = "#666666";
              spamRef.current.style.color = "#D92F25";
              trashRef.current.style.color = "#666666";
            }}
            label="Spam"
          />
          <BottomNavigationAction
            ref={trashRef}
            onClick={() => {
              promotionRef.current.style.color = "#666666";
              spamRef.current.style.color = "#666666";
              trashRef.current.style.color = "#168037";
            }}
            label="Trash"
          />
        </BottomNavigation>
      </Box>
    </StyledSectionDiv>
  );
}

export default Header;
