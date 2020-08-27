import React from "react";
import { FaSpotify } from "react-icons/fa";
import { Link } from "react-router-dom";

import {
  Container,
  NavBar,
  NavBarHeader,
  NavBarMenu,
  StyledNavLink,
  NewPlayList,
} from "./styles";

import AddPlayListIcon from "../../assets/images/add_playlist.svg";

const Sidebar = ({ handleSidebar, showSidebar }) => {
  return (
    <Container showSidebar={showSidebar}>
      <NavBar>
        <NavBarHeader>
          <Link exact to="/browse/categories" onClick={window.innerWidth <= 768 ? handleSidebar : null}>
            <span>
              <FaSpotify />
            </span>
            Reactify
          </Link>
        </NavBarHeader>

        <NavBarMenu>
          <li onClick={window.innerWidth <= 768 ? handleSidebar : null}>
            <StyledNavLink to="/browse/categories">Início</StyledNavLink>
          </li>
        </NavBarMenu>
      </NavBar>

      <NewPlayList>
        <img src={AddPlayListIcon} alt="Adicionar playlist" />
        Nova Playlist
      </NewPlayList>
    </Container>
  );
};

export default Sidebar;
