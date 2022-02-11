import React, { useState } from "react";
import PostBox from "./PostBox";
import ModalPortals from "../ModalPortals/ModalPortals";
import ItemBox from "../ItemBox/ItemBox";
import Shop from "../Shop/Shop";

function Town() {
  const [isItemBoxOpen, setIsItemBoxOpen] = useState(true);
  const [isShopOpen, setIsShopOpen] = useState(true);

  return (
    <div>
      <PostBox />
      <ModalPortals>
        {isItemBoxOpen && <ItemBox onClose={setIsItemBoxOpen} />}
        {isShopOpen && <Shop onClose={setIsShopOpen} />}
      </ModalPortals>
    </div>
  );
}

export default Town;
