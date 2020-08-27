import styled, { css } from "styled-components";
import { Link } from "react-router-dom";

import { Spinner } from "../../components/Loading/styles";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  margin-top: 30px;

  ${Spinner} {
    height: 48px;
  }

  ${(props) =>
    props.loading &&
    css`
      justify-content: center;
      align-items: center;
      margin-top: 0;
      height: calc(100vh - 302px);
    `}
`;

export const NavBar = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  justify-content: flex-end;
  min-height: 250px;
  padding: 0 30px;
  z-index: 2;

  div {
    margin: 10px 0;

    h1 {
      font-size: 48px;
    }
  }

  nav {
    display: flex;
    margin-top: 10px;
    margin-bottom: 5px;

    a:nth-child(1) {
      padding-left: 0;
    }

    a {
      color: #b3b3b3;
      text-decoration: none;
      padding: 0 16px;
      display: inline-block;
      text-align: center;
      line-height: 35px;
      text-transform: uppercase;
      font-weight: bold;
      font-size: 12px;
      letter-spacing: 0.08em;

      &.selected {
        position: relative;
        color: #fff;
      }

      &.selected:before {
        content: "";
        position: absolute;
        bottom: 0;
        width: 30px;
        height: 2px;
        background-color: #1ed760;
        left: 50%;
        transform: translate(-50%, 0);
      }
    }
  }
`;

export const Content = styled.div`
  padding: 0 20px;

  h3 {
    font-size: 16px;
    margin-bottom: 10px;
    padding: 0 10px;
  }

  hr {
    border: 0;
    height: 1px;
    background-color: #3d3d3d;
    margin: 0 10px;
  }
`;

export const List = styled.div`
  margin-top: 15px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

export const Category = styled.div`
  width: 20%;
  padding-left: 10px;
  padding-right: 10px;
  margin-bottom: 20px;

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

export const CategoryLink = styled(Link)`
  flex: 100%;

  div {
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    filter: brightness(1);
    width: 100%;
    height: 0px;
    padding-bottom: 100%;
    position: relative;

    span {
      position: absolute;
      display: block;
      width: 75%;
      color: #fff;
      top: 75%;
      left: 50%;
      transform: translate(-50%, -50%);
      line-height: 21px;
      white-space: nowrap;
      border-bottom: 1px solid transparent;
      text-align: center;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }

  &:hover > span {
    border-bottom: 1px solid #fff;
  }
`;
