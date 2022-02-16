import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { nanoid } from "nanoid";
import PropTypes from "prop-types";
import { changeStorage, getPresentBox } from "../../api/item";
import Item from "../Item/Item";
import { useDispatch } from "react-redux";
import { toggleItemBox } from "../../features/modal/modalSlice";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

const ItemContainerDiv = styled.div`
  display: flex;
  position: relative;
  width: 450px;
  height: 680px;
  flex-wrap: wrap;
  justify-content: space-between;
  align-content: flex-start;
  overflow-y: auto;

  ::-webkit-scrollbar {
    display: none;
  }
`;

function PresentBox({ setOutItems }) {
  const [presentList, setPresentList] = useState([]);
  const { id } = useParams();
  const dispatch = useDispatch();
  const axiosInstance = useAxiosPrivate();
  const GMAIL_ADDRESS = 10;

  useEffect(async () => {
    try {
      const presentBox = await getPresentBox({ townId: id, axiosInstance });

      setPresentList(presentBox.result);
    } catch (err) {
      console.error(err);
    }
  }, []);

  const moveItemToOutBox = async (itemName) => {
    const targetItem = presentList.find((item) => {
      return item.name === itemName;
    });

    const response = await changeStorage({
      userId: id,
      itemId: targetItem._id,
      from: "presentBox",
      to: "outItemBox",
      axiosInstance,
    });

    const { outBox } = response.result;

    setOutItems(outBox);
    dispatch(toggleItemBox());
  };

  return (
    <ItemContainerDiv>
      {presentList &&
        presentList.map((item) => {
          const key = nanoid();
          return (
            <Item
              key={key}
              storageType="presentBox"
              content={item.purchasedBy.slice(
                0,
                item.purchasedBy.length - GMAIL_ADDRESS,
              )}
              imageName={item.name}
              moveToOutBox={moveItemToOutBox}
            />
          );
        })}
    </ItemContainerDiv>
  );
}

export default PresentBox;

PresentBox.propTypes = {
  setOutItems: PropTypes.func,
};
