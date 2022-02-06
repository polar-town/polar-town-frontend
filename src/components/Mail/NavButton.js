import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const StyledNavButton = styled.button`
  width: 160px;
  height: 50px;
  all: unset;
  color: #666666;
  font-size: 25px;
  font-weight: 700;
  cursor: pointer;
`;

function NavButton({ category }) {
  return <StyledNavButton onClick={() => {}}>{category}</StyledNavButton>;
}

export default NavButton;

NavButton.propTypes = {
  category: PropTypes.string.isRequired,
};
