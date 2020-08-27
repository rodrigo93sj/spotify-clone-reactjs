import React, { useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Creators as TokenActions } from "./store/ducks/token";

import { Container, LoginContainer, Content } from "./styles/components";

import Login from "./pages/login/index";
import Sidebar from "./components/Sidebar";
import Player from "./components/Player";
import Header from "./components/Header";
import ErrorBox from "./components/ErrorBox";

import Loading from "./components/Loading";

import Routes from "./routes";

const Main = ({ getTokenRequest, token }) => {
  useEffect(() => {
    getTokenRequest();
  }, [getTokenRequest]);

  return (
    <>
      {!token ? (
        <LoginContainer>
          <Login />
        </LoginContainer>
      ) : (
        <>
          <Container>
            <Sidebar />
            <Content>
              <Header />
              <ErrorBox />
              <Routes />
            </Content>
          </Container>
          <Player />
        </>
      )}
    </>
  );
};

Main.propTypes = {
  token: PropTypes.string,
};

const mapStateToProps = (state) => ({
  token: state.token._token,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(TokenActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Main);
