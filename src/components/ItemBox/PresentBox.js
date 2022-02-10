import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { nanoid } from "nanoid";
import { getPresentBox } from "../../api/item";
import Item from "../Item/Item";

const StyledItemContainerDiv = styled.div`
  display: flex;
  position: relative;
  width: 450px;
  height: 680px;
  flex-wrap: wrap;
  justify-content: space-between;
  align-content: flex-start;
  overflow-y: auto;
  scrollbar-color: #c9d6d5;

  ::-webkit-scrollbar {
    display: none;
    width: 15px;
  }
`;

function PresentBox() {
  const [presentList, setPresentList] = useState([]);
  const { id } = useParams();

  useEffect(async () => {
    try {
      const presentBox = await getPresentBox(id);

      setPresentList(presentBox.result);
    } catch (err) {
      console.error(err);
    }
  }, []);

  return (
    <StyledItemContainerDiv>
      {presentList &&
        presentList.map((item) => {
          const key = nanoid();
          return (
            <Item
              key={key}
              storageType="presentBox"
              data={item.purchasedBy.slice(0, item.purchasedBy.length - 10)}
              imageName={item.name}
            />
          );
        })}
    </StyledItemContainerDiv>
  );
}

export default PresentBox;
