import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Item from "../Item/Item";
import { getInItemBox } from "../../api/item";
import { countItem, itemCounter } from "../../utils/item";
import {
  selectItemCount,
  updateItemCount,
} from "../../features/user/userSlice";

const StyledDiv = styled.div`
  display: flex;
  width: 450px;
  flex-wrap: wrap;
  justify-content: space-between;
`;

function MyItemBox() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [isMounted, setIsMounted] = useState(false);
  const [myItemList, setMyItemList] = useState([]);
  const [iceCount, setIceCount] = useState([]);
  const itemNameList = [
    "PolarBear",
    "Penguin",
    "Seal",
    "Igloo",
    "Flower",
    "Ice",
  ];
  const itemCount = useSelector(selectItemCount);

  useEffect(async () => {
    setIsMounted(true);

    try {
      if (isMounted) {
        const myItemBox = await getInItemBox(id);

        setMyItemList(myItemBox.result.inItemBox);
        setIceCount(myItemBox.result.iceCount);
      }
    } catch (err) {
      console.error(err);
    }

    return () => {
      setIsMounted(false);
    };
  }, [isMounted]);

  useEffect(() => {
    if (!myItemList.length) {
      return;
    }

    myItemList.forEach((item) => {
      countItem(item);
    });

    dispatch(updateItemCount(itemCounter));
    countItem(null, true);
  }, [myItemList]);

  return (
    <StyledDiv>
      {itemNameList.map((item) => {
        return (
          <Item
            key={item}
            storageType="myItemBox"
            content={item === "Ice" ? iceCount : itemCount[item]}
            imageName={item}
            shouldOverlaid={itemCount[item] === 0 ? true : false}
          />
        );
      })}
    </StyledDiv>
  );
}

export default MyItemBox;
