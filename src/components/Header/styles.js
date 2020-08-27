import styled from "styled-components";

import SearchIcon from "../../assets/images/search.svg";

import { Spinner } from "../Loading/styles";

export const Container = styled.header`
  position: fixed;
  top: 0;
  right: 14px;
  left: 230px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 50px;
  padding: 0 20px;
  background-color: #282828;
  z-index: 10;

  ${Spinner} {
    height: 18px;
  }

  @media (max-width: 768px) {
    left: 0;
  }
`;

export const Search = styled.div`
  display: flex;
  align-items: center;
  border-radius: 12px;
  width: 175px;
  height: 24px;
  padding: 6px 7px 6px 26px;
  background: #fff url(${SearchIcon}) no-repeat 7px center;

  input {
    width: 100%;
    font-size: 13px;
    color: #121212;
    border: 0;
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

export const SideBarToggle = styled.div`
  display: none;
  font-size: 20px;
  cursor: pointer;
  
  @media (max-width: 768px) {
    display: flex;
  }
`;

export const User = styled.div`
  position: relative;

  button {
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #fff;
    background-color: #2d2d2d;
    border-radius: 20px;
    font-size: 14px;
    height: 30px;
    padding: 0 10px;
    cursor: pointer;
    user-select: none;
    outline: 0;
    border: 0;
    box-shadow: 0px 3px 3px 1px rgba(0, 0, 0, 0.5);

    span:not(:last-child) {
      margin-right: 10px;
    }

    span:last-child {
      font-size: 18px;
      margin-top: 5px;
    }
  }

  ul {
    position: absolute;
    width: 100%;
    background-color: #2d2d2d;
    border-radius: 5px;
    list-style: none;
    right: 0;
    padding: 0;
    margin-top: 10px;
    box-shadow: 0px 3px 3px 1px rgba(0, 0, 0, 0.5);
    z-index: 15;

    li {
      font-size: 14px;
      color: #b3b3b3;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 3px 20px;
      user-select: none;
      height: 32px;
      line-height: 32px;
      cursor: pointer;
    }

    li:hover {
      background-color: #333;
      color: #ffffff;
    }
  }
`;
