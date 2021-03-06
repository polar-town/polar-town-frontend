import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { getMailList } from "../../api/mail";

const StyledNavButton = styled.button`
  all: unset;
  color: var(--mail-basic);
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
