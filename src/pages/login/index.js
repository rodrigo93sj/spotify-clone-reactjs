import React from "react";
import { FaSpotify } from "react-icons/fa";

import {
  authEndpoint,
  clientId,
  redirectUri,
  scopes,
} from "../../config/configAuthorization";

import { LoginWrapper, LoginContent, LoginHeader } from "./styles";

const Login = () => {
  return (
    <LoginWrapper>
      <div></div>
      <LoginContent>
        <LoginHeader>
          <span>
            <FaSpotify />
          </span>
          Reactify
        </LoginHeader>
        <a
          href={`${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
            "%20"
          )}&response_type=token&show_dialog=true`}
        >
          Login de Acesso
        </a>
      </LoginContent>
    </LoginWrapper>
  );
};

export default Login;
