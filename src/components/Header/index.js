import React, { useState, useEffect } from "react";
import { FaUser, FaAngleDown, FaAngleUp, FaBars } from "react-icons/fa";

import { useHistory } from "react-router-dom";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Creators as MeActions } from "../../store/ducks/me";

import { Container, Search, SideBarToggle, User } from "./styles";

import Loading from "../Loading";

const Header = ({ getMeRequest, me, handleSidebar }) => {
  let history = useHistory();
  const [dropdown, setDropdown] = useState(false);

  useEffect(() => {
    getMeRequest();
  }, [getMeRequest]);

  useEffect(() => {
    console.log(me)
  }, [me]);

  const handleDropdown = () => {
    setDropdown(!dropdown);
  };

  const handleLogout = () => {
    localStorage.clear();
    history.push('/login')
  };

  return (
    <Container>
      <Search>
        <input placeholder="Search" />
      </Search>

      <SideBarToggle onClick={handleSidebar}>
        <FaBars />
      </SideBarToggle>

      <User>
        <button class="dropdown--button" onClick={handleDropdown}>
          <span class="user-icon">
            <FaUser />
          </span>
          <span>
            {!localStorage.getItem("user") && me.loading && <Loading />}
            {!!JSON.parse(localStorage.getItem("user")) &&
              JSON.parse(localStorage.getItem("user")).display_name}
          </span>
          <span>{!dropdown ? <FaAngleDown /> : <FaAngleUp />}</span>
        </button>
        <ul style={{ display: dropdown ? "block" : "none" }}>
          <li onClick={handleLogout}>Sair</li>
        </ul>
      </User>
    </Container>
  );
}

const mapStateToProps = (state) => ({
  me: state.me,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(MeActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Header);