import React, { useEffect } from "react";
import getAccessToken from "../../utils/accessToken";

function Town() {
  useEffect(() => {
    getAccessToken();
  });
  return <div>이것은 마을 페이지</div>;
}

export default Town;
