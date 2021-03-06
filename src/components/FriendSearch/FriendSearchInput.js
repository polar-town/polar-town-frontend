import React, { useRef } from "react";
import proptypes from "prop-types";
import styled from "styled-components";
import { getSearchedFriendList } from "../../api/friendSearch";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import useLogout from "../../hooks/useLogout";

const SearchInputContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  width: 100%;
  background-color: #f5ecdb;
  border-radius: 30px;

  input {
    width: 90%;
    height: 50px;
    font-size: 15px;
    border: 0;
    outline: none;
    padding-left: 20px;
    background: transparent;
  }

  .fa-magnifying-glass {
    font-size: 25px;
  }
`;

function FriendSearchInput({ updateResult, onPageChange, storeQuery }) {
  const searchInput = useRef();
  const axiosInstance = useAxiosPrivate();
  const logout = useLogout();

  async function handleSendButtonClick() {
    try {
      const query = searchInput.current.value;
      const searchResult = await getSearchedFriendList({
        query,
        axiosInstance,
      });
      onPageChange(2);
      storeQuery(query);
      updateResult(searchResult.users);
    } catch (error) {
      console.error(error.response?.status);
      if (error.response?.status === 401) {
        logout();
      }
    }
  }

  return (
    <SearchInputContainer>
      <input ref={searchInput} type="text" />
      <i onClick={handleSendButtonClick} className="fas fa-search" />
    </SearchInputContainer>
  );
}

export default FriendSearchInput;

FriendSearchInput.propTypes = {
  updateResult: proptypes.func.isRequired,
  onPageChange: proptypes.func.isRequired,
  storeQuery: proptypes.func,
};
