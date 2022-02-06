import { useEffect, useState } from "react";
import USER_INFO_SCOPE from "../constants/userInfoScope";

function useGapi() {
  const [gapi, setGapi] = useState(null);

  useEffect(() => {
    const script = document.createElement("script");

    script.onload = handleLoad;
    script.src = "https://apis.google.com/js/platform.js";
    document.body.appendChild(script);
  }, []);

  async function handleLoad() {
    if (!window.gapi) return;

    await window.gapi.load("auth2", handleGoogleAuth2);
  }

  async function handleGoogleAuth2() {
    const params = {
      client_id: process.env.REACT_APP_CLIENT_ID,
      scope: USER_INFO_SCOPE,
      ux_mode: "popup",
      cookie_policy: "single_host_origin",
    };

    await window.gapi.auth2.init(params);
    setGapi(window.gapi);
  }

  return gapi;
}

export default useGapi;
