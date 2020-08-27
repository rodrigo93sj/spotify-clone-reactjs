import styled from "styled-components";

import { NavLink } from "react-router-dom";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow-y: scroll;
  overflow-x: hidden;
  height: calc(100vh - 72px);
`;

export const NavBar = styled.div`
  position: sticky;
  position: -webkit-sticky;
  top: -80px;
  display: flex;
  flex-direction: column;
  flex: 1;
  justify-content: flex-end;
  min-height: 230px;
  max-height: 230px;
  padding: 0 30px;
  background: linear-gradient(to bottom, #414141 0%, #181818 100%), transparent;
  border-bottom-width: 1px;
  border-bottom-style: solid;
  border-bottom-color: #181818;
  transition: all 0.3s ease;
  z-index: 5;

  div:last-of-type {
    h1 {
      font-size: 38px;
      margin: 10px 0;
    }
  }

  nav {
    display: flex;
    margin-bottom: 5px;

    div:nth-child(1) {
      padding-left: 0;
    }
  }

  @media (max-width: 768px) {
    div:last-of-type {
      h1 {
        font-size: 36px;
      }
    }
  }

  @media (max-width: 576px) {
    top: -60px;

    nav {
      display: flex;
      flex-direction: column;

      div {
        text-align: center;
        padding: 0;
      }
    }

    div:last-of-type {
      h1 {
        font-size: 28px;
      }
    }
  }
`;

export const Tab = styled.div`
  padding: 0 16px;
`;

const activeClassName = "nav-item-active";

export const StyledNavLink = styled(NavLink).attrs({ activeClassName })`
  display: inline-block;
  position: relative;
  text-decoration: none;
  font-size: 12px;
  font-weight: bold;
  color: #fff;
  opacity: 0.7;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  padding: 10px 0;

  &.${activeClassName} {
    opacity: 1;
  }

  &.${activeClassName}::after {
    content: "";
    position: absolute;
    width: 30px;
    height: 2px;
    bottom: 0;
    left: 50%;
    transform: translate(-50%, 0);
    background-color: #1db954;
    transition: background-color 0.3s ease-in-out;
  }

  &:hover {
    color: #ffffff;
    opacity: 1;
  }

  @media (max-width: 576px) {
    font-size: 11px;
    width: 100%;
    line-height: 15px;

    &.${activeClassName} {
      background-color: #1db954;
    }

    &.${activeClassName}::after {
      content: none;
    }
  }
`;

export const Main = styled.main`
  height: 100%;
`;
