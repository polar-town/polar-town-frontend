import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import Item from "../Item/Item";
import { changeStorage, getInItemBox } from "../../api/item";
import { countItem, itemCounter } from "../../utils/item";
import { ITEM_LIST } from "../../constants/item";
import {
  selectItemCount,
  selectUser,
  updateItemCount,
} from "../../features/user/userSlice";

const ItemContainerDiv = styled.div`
  display: flex;
  width: 450px;
  flex-wrap: wrap;
  justify-content: space-between;
`;

function MyItemBox({ onClose }) {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [isMounted, setIsMounted] = useState(false);
  const [myItemList, setMyItemList] = useState([]);
  const itemCount = useSelector(selectItemCount);
  const iceCount = useSelector(selectUser).iceCount;

  useEffect(async () => {
    setIsMounted(true);

    try {
      if (isMounted) {
        const myItemBox = await getInItemBox(id);

        setMyItemList(myItemBox.result.inItemBox);
      }
    } catch (err) {
      console.error(err);
    }

    return () => {
      setIsMounted(false);
    };
  }, [isMounted]);

  useEffect(() => {
    if (!myItemList?.length) {
      return;
    }
    myItemList.forEach((item) => {
      countItem(item);
    });

    dispatch(updateItemCount(itemCounter));
    countItem(null, true);
  }, [myItemList]);

  const moveItemToOutBox = async (itemName) => {
    const targetItem = myItemList.find((item) => {
      return item.name === itemName;
    });

    await changeStorage(id, targetItem._id, "inItemBox", "outItemBox");

    onClose(false);
  };

  return (
    <ItemContainerDiv>
      {ITEM_LIST.map((item) => {
        return (
          <Item
            key={item}
            storageType="myItemBox"
            content={item === "Ice" ? iceCount : itemCount[item]}
            imageName={item}
            shouldOverlaid={itemCount[item] === 0 ? true : false}
            moveToOutBox={moveItemToOutBox}
          />
        );
      })}
    </ItemContainerDiv>
  );
}

export default MyItemBox;

MyItemBox.propTypes = {
  onClose: PropTypes.func.isRequired,
};
