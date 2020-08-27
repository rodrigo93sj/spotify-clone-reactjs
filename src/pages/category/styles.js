import styled, { css } from "styled-components";

import { Spinner } from "../../components/Loading/styles";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow-y: scroll;
  height: calc(100vh - 72px);
`;

export const LoadContent = styled.div`
  ${Spinner} {
    height: 48px;
  }

  ${(props) =>
    props.loading &&
    css`
      display: flex;
      justify-content: center;
      align-items: center;
      height: calc(100vh - 72px);
    `}
`;

export const HeaderBar = styled.div`
  position: sticky;
  position: -webkit-sticky;
  top: -80px;
  display: flex;
  flex-direction: column;
  flex: 1;
  justify-content: flex-end;
  min-height: 200px;
  max-height: 200px;
  padding: 0 30px;
  background: linear-gradient(to bottom, #414141 0%, #181818 100%), transparent;
  border-bottom-width: 1px;
  border-bottom-style: solid;
  border-bottom-color: #181818;
  transition: all 0.3s ease;
  z-index: 5;

  div {
    h1 {
      font-size: 38px;
      margin: 10px 0 20px 0;
    }
  }
`;

export const Main = styled.main`
  flex: 1;
  margin-top: 30px;
`;

export const Content = styled.div`
  padding: 0 20px;

  h3 {
    font-size: 16px;
    margin: 0 10px;
  }

  hr {
    border: 0;
    height: 1px;
    background-color: #3d3d3d;
    margin: 5px 10px;
  }
`;

export const List = styled.div`
  margin-top: 15px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

export const CategoryItems = styled.div`
  width: 20%;
  padding-left: 10px;
  padding-right: 10px;
  margin-bottom: 40px;

  h4 {
    font-size: 13px;
    color: #fff;
    margin-top: 14px;
  }

  p {
    font-size: 13px;
    color: #b3b3b3;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: normal;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    margin-top: 8px;
  }

  @media (max-width: 1200px) {
    width: 25%;
  }

  @media (max-width: 992px) {
    width: 33%;
  }

  @media (max-width: 768px) {
    width: 50%;
  }

  // @media (max-width: 576px) {
  //   width: 100%;
  // }
`;

export const MediaContent = styled.div`
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  display: block;
  flex: 100%;
  height: 0;
  padding-bottom: 100%;
  position: relative;
  cursor: pointer;

  &:hover:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.65);
  }

  &:hover > button {
    display: block;
  }

  button {
    width: 62px;
    height: 62px;
    position: absolute;
    display: none;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: transparent;
    border-radius: 50%;
    border: 0;
    z-index: 3;

    &:hover > img {
      transform: scale(1.1);
      background-color: rgba(0, 0, 0, 0.8);
    }
  }

  ${(props) =>
    props.selected &&
    `
    &:before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      background-color: rgba(0, 0, 0, 0.65);
    }

    button {
      display: block;
    }
  `}

  img {
    width: 100%;
    background-color: rgba(0, 0, 0, 0.6);
    border-radius: 50%;
  }
`;
