import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import Item from "../Item/Item";
import { changeStorage, getInItemBox } from "../../api/item";
import { countItem, itemCounter } from "../../utils/item";
import { ITEM_LIST } from "../../constants/item";
import { updateItemCount } from "../../features/user/userSlice";
import { toggleItemBox } from "../../features/modal/modalSlice";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

const ItemContainerDiv = styled.div`
  display: flex;
  width: 450px;
  flex-wrap: wrap;
  justify-content: space-between;
`;

function MyItemBox({ setOutItems }) {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [isMounted, setIsMounted] = useState(false);
  const [myItemList, setMyItemList] = useState([]);
  const { user, itemCount } = useSelector((state) => state.user);
  const iceCount = user.iceCount;
  const axiosInstance = useAxiosPrivate();

  useEffect(async () => {
    setIsMounted(true);

    try {
      if (isMounted) {
        const myItemBox = await getInItemBox({ townId: id, axiosInstance });

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

    const response = await changeStorage({
      userId: id,
      itemId: targetItem._id,
      from: "inItemBox",
      to: "outItemBox",
      axiosInstance,
    });

    setOutItems(response.result.outBox);
    dispatch(toggleItemBox());
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
  setOutItems: PropTypes.func.isRequired,
};
