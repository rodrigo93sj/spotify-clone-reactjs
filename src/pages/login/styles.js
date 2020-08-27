import styled from "styled-components";

import bg from "../../assets/images/background-login.jpg";

export const LoginWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  background-image: url(${bg});
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  width: 100%;
  height: 100%;

  > div:nth-child(1) {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: linear-gradient(to bottom, #414141 0%, #181818 100%);
    opacity: 0.7;
  }

  a {
    display: flex;
    background-color: #1db954;
    color: #fff;
    font-size: 16px;
    border-radius: 32px;
    text-decoration: none;
    padding: 15px 35px;
    text-align: center;
  }

  a:hover {
    background-color: #1ed760;
    color: #fff;
  }
`;

export const LoginContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  z-index: 5;
`;

export const LoginHeader = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: 100%;
  width: 100%;
  margin-bottom: 30px;
  font-size: 46px;
  color: #fff;

  span {
    font-size: 48px;
    margin-right: 10px;
    color: #fff;
  }
`;
