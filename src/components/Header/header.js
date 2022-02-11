import axios from "axios";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import proptype from "prop-types";
import {
  removeLogoutUser,
  selectUser,
  selectUserToken,
} from "../../features/user/userSlice";
import useGapi from "../../hooks/useGapi";

const StyledHeader = styled.header`
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

const StyledNavWrapperNav = styled.nav`
  i {
    color: var(--header-content);
    margin-right: 20px;
    margin-left: 10px;
    font-size: 20px;
    cursor: pointer;
  }
`;

function Header({ toggleMail, toggleFindUser, toggleFriendList, toggleShop }) {
  const dispatch = useDispatch();
  const gapi = useGapi();
  const user = useSelector(selectUser);
  const currentUserAccessToken = useSelector(selectUserToken);

  const logout = async () => {
    const auth2 = gapi.auth2.getAuthInstance();

    auth2.signOut().then(function () {
      auth2.disconnect();
    });

    dispatch(removeLogoutUser());

    await axios.post(`${process.env.REACT_APP_BASE_URL}/auth/logout`, {
      email: user.email,
    });
  };

  return (
    <StyledHeader>
      <StyledImgWrapperDiv>
        <img src="/images/logo.png" alt="mailLogo" />
      </StyledImgWrapperDiv>
      {currentUserAccessToken && (
        <StyledNavWrapperNav>
          <i
            className="fas fa-envelope"
            onClick={() => {
              toggleMail(true);
            }}
          />
          <i className="fas fa-user-plus" />
          <i
            className="fas fa-user-friends"
            onClick={() => {
              toggleFriendList(true);
            }}
          />
          <i className="fas fa-store" onClick={toggleShop} />
          <i className="fas fa-sign-out-alt" onClick={logout} />
        </StyledNavWrapperNav>
      )}
    </StyledHeader>
  );
}

export default Header;

Header.propTypes = {
  toggleMail: proptype.func,
  toggleFindUser: proptype.func,
  toggleFriendList: proptype.func,
  toggleShop: proptype.func,
};
