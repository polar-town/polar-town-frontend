import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import proptypes from "prop-types";
import styled from "styled-components";
import useGapi from "../../hooks/useGapi";
import { EVENTS, LEFT_TYPE } from "../../constants/socketEvents";
import { userLogout } from "../../api/auth";
import {
  toggleMail,
  toggleFriendSearch,
  toggleFriendList,
  toggleShop,
} from "../../features/modal/modalSlice";
import { resetLoginUser } from "../../features/user/userSlice";

const HeaderContainer = styled.header`
  width: 100vw;
  height: 60px;
  background: rgba(214, 245, 245, 0.5);
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ImgWrapperDiv = styled.div`
  line-height: 60px;

  img {
    image-rendering: pixelated;
    vertical-align: middle;
    padding: 0 20px;
  }
`;

const NavWrapperNav = styled.nav`
  i {
    color: var(--header-content);
    margin-right: 20px;
    margin-left: 10px;
    font-size: 20px;
    cursor: pointer;
  }
`;

function Header({ socket }) {
  const dispatch = useDispatch();
  const { id: prevTownId } = useParams();
  const { user, isAuth } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const gapi = useGapi();

  const logout = async () => {
    const auth2 = gapi.auth2.getAuthInstance();

    auth2.signOut().then(function () {
      auth2.disconnect();
    });

    await userLogout(user);
    navigate("/logout");
    socket.emit(EVENTS.LEFT, { prevTownId, user, type: LEFT_TYPE.SIGNOUT });
    dispatch(resetLoginUser());
  };

  return (
    <HeaderContainer>
      <ImgWrapperDiv>
        <img
          src="/images/logo.png"
          alt="mailLogo"
          onClick={() => {
            navigate(`/users/${user.id}`);
          }}
        />
      </ImgWrapperDiv>
      {isAuth && (
        <NavWrapperNav>
          <i
            className="fas fa-envelope"
            onClick={() => {
              dispatch(toggleMail());
            }}
          />
          <i
            className="fas fa-user-plus"
            onClick={() => {
              dispatch(toggleFriendSearch());
            }}
          />
          <i
            className="fas fa-user-friends"
            onClick={() => {
              dispatch(toggleFriendList());
            }}
          />
          <i
            className="fas fa-star"
            onClick={() => {
              dispatch(toggleShop());
            }}
          />
          <i className="fas fa-sign-out-alt" onClick={logout} />
        </NavWrapperNav>
      )}
    </HeaderContainer>
  );
}

export default Header;

Header.propTypes = {
  socket: proptypes.object,
};
