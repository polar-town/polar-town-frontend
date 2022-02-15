import React, { useState, useEffect } from "react";
import styled from "styled-components";
import proptypes from "prop-types";
import { nanoid } from "nanoid";
import GameModal from "../GameModal/GameModal";
import GameModalButton from "../GameModal/GameModalButton";
import FriendSearchInput from "./FriendSearchInput";
import FriendSearchRow from "./FriendSearchRow";
import { PAGE_OPTION, SUBJECT } from "../../constants/searchFriend";
import { useDispatch, useSelector } from "react-redux";
import { toggleFriendSearch } from "../../features/modal/modalSlice";
import { getSearchedFriendList } from "../../api/friendSearch";
import { getFriendList, getPendingFriendList } from "../../api/friendlist";

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

function FriendSearch({ socket }) {
  const [userFriendList, setUserFriendList] = useState([]);
  const [userPendingFriendList, setUserPendingFriendList] = useState([]);
  const [searchedFriends, setSearchedFriends] = useState([]);
  const [hasResult, setHasResult] = useState(true);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(async () => {
    const friendList = await getFriendList(user.id);
    const pendingFriendList = await getPendingFriendList(user.id);

    if (friendList.result !== "error" && pendingFriendList.result !== "error") {
      setUserFriendList([...friendList]);
      setUserPendingFriendList([...pendingFriendList]);
    } else {
      // error handling!
    }
  }, []);

  async function onPageChange(option) {
    if (option === PAGE_OPTION[PREV] && page > 1) {
      const searchResult = await getSearchedFriendList(
        user.id,
        query,
        page - 1,
      );
      setPage(searchResult.page);
      setSearchedFriends(searchResult.users);
      return;
    }

    if (hasResult) {
      const searchResult = await getSearchedFriendList(
        user.id,
        query,
        page + 1,
      );
      if (!searchResult.users.length) {
        setHasResult(false);
        return;
      }
      setPage(searchResult.page);
      setSearchedFriends(searchResult.users);
    }
  }

  return (
    <GameModal
      onClose={() => {
        dispatch(toggleFriendSearch());
      }}
      subject={SUBJECT}
    >
      <FriendSearchInput
        updateResult={setSearchedFriends}
        onPageChange={setPage}
        storeQuery={setQuery}
      />
      {!!searchedFriends.length &&
        searchedFriends.map((friend) => {
          const key = nanoid();

          return (
            friend.id !== user.id && (
              <FriendSearchRow
                key={key}
                friend={friend}
                userFriendList={userFriendList}
                userPendingFriendList={userPendingFriendList}
                socket={socket}
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
  socket: proptypes.object,
};
