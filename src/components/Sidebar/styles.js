import styled from "styled-components";

import { NavLink } from "react-router-dom";

export const Container = styled.aside`
  position: fixed;
  width: 230px;
  top: 0;
  left: 0;
  bottom: 72px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: #121212;
  color: #b3b3b3;
  z-index: 10;

  @media (max-width: 768px) {
    position: absolute;
    top: 50px;
    bottom: 0;
    left: ${(props) => props.showSidebar ? '0' : '-230px'};
    transition: .3s;
  }
`;

export const NavBar = styled.nav`
  display: flex;
  flex-direction: column;
  padding-top: 24px;
  flex: 1;
`;

export const NavBarHeader = styled.div`
  a {
    display: flex;
    font-size: 24px;
    font-weight: 700;
    text-decoration: none;
    width: 100%;
    padding-left: 24px;
    padding-bottom: 18px;
    line-height: 40px;
    color: #fff;

    span {
      display: flex;
      align-items: center;
      margin-right: 5px;
      font-size: 40px;
    }
  }
`;

export const NavBarMenu = styled.ul`
  list-style: none;
  margin-top: 25px;

  &:first-of-type {
    margin: 0;
  }

  li {
    display: flex;
    align-items: center;
    flex: 1;
    padding: 0 8px;
  }
`;

const activeClassName = "nav-item-active";

export const StyledNavLink = styled(NavLink).attrs({ activeClassName })`
  font-size: 14px;
  text-decoration: none;
  color: #fff;
  opacity: 0.7;
  width: 100%;
  padding: 0 16px;
  line-height: 40px;
  cursor: pointer;
  font-weight: bold;
  transition: all 0.3s ease;

  &:hover {
    color: #fff;
    opacity: 1;
  }

  &.${activeClassName} {
    position: relative;
    color: #fff;
    opacity: 1;
    display: flex;
    align-items: center;
  }

  &.${activeClassName}::before {
    content: "";
    position: absolute;
    left: -8px;
    height: 18px;
    border-left: 4px solid #1ed760;
  }
`;

export const NewPlayList = styled.button`
  display: flex;
  align-items: center;
  background-color: transparent;
  border: 0;
  border-top: 1px solid #282828;
  font-size: 13px;
  color: #b3b3b3;
  padding: 15px 25px;

  &:hover {
    color: #fff;
  }

  img {
    margin-right: 10px;
  }
`;
