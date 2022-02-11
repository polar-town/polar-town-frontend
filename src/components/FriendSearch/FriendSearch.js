import React, { useState } from "react";
import styled from "styled-components";
import proptypes from "prop-types";
import { nanoid } from "nanoid";
import GameModal from "../GameModal/GameModal";
import GameModalButton from "../GameModal/GameModalButton";
import FriendSearchInput from "./FriendSearchInput";
import FriendSearchRow from "./FriendSearchRow";
import { PAGE_OPTION, SUBJECT } from "../../constants/searchFriend";
import { useSelector } from "react-redux";
import { selectUserId } from "../../features/user/userSlice";
import { getSearchedFriendList } from "../../api/friendSearch";

const PaginationButtonContainer = styled.div`
  display: flex;
  justify-content: center;

  button {
    &:nth-child(1) {
      margin-right: 10px;
    }
  }
`;

const PREV = 0;

function FriendSearch({ toggleFriendSearch, visitFriend }) {
  const [searchedFriends, setSearchedFriends] = useState([]);
  const [hasResult, setHasResult] = useState(true);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");
  const userId = useSelector(selectUserId);

  async function onPageChange(option) {
    if (option === PAGE_OPTION[PREV] && page > 1) {
      const searchResult = await getSearchedFriendList(userId, query, page - 1);
      setPage(searchResult.page);
      setSearchedFriends(searchResult.users);
      return;
    }

    if (hasResult) {
      const searchResult = await getSearchedFriendList(userId, query, page + 1);
      if (!searchResult.users.length) {
        setHasResult(false);
        return;
      }
      setPage(searchResult.page);
      setSearchedFriends(searchResult.users);
    }
  }

  return (
    <GameModal onClose={() => toggleFriendSearch(false)} subject={SUBJECT}>
      <FriendSearchInput
        updateResult={setSearchedFriends}
        onPageChange={setPage}
        storeQuery={setQuery}
      />
      {!!searchedFriends.length &&
        searchedFriends.map((friend) => {
          const key = nanoid();

          return (
            friend.id !== userId && (
              <FriendSearchRow
                key={key}
                friend={friend}
                visitFriend={visitFriend}
                toggleFriendSearch={toggleFriendSearch}
              />
            )
          );
        })}
      <PaginationButtonContainer>
        {!!searchedFriends.length &&
          PAGE_OPTION.map((option) => {
            const key = nanoid();

            return (
              <GameModalButton
                key={key}
                content={option}
                onClick={() => {
                  onPageChange(option);
                }}
              />
            );
          })}
      </PaginationButtonContainer>
    </GameModal>
  );
}

export default FriendSearch;

FriendSearch.propTypes = {
  toggleFriendSearch: proptypes.func.isRequired,
  visitFriend: proptypes.func.isRequired,
};
