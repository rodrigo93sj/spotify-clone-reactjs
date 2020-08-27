import React, { useState } from "react";

import { Redirect } from "react-router-dom";

import { Container, Content } from "./styles.js";

import Sidebar from "../Sidebar";
import Player from "../Player";
import Header from "../Header";

const Main = ({ children }) => {
  const [showSidebar, setShowSidebar] = useState(false)

  const handleSidebar = () => {
    setShowSidebar(!showSidebar)
  }

  return (
    <>
      {!!localStorage.getItem("token") && (
        <>
          <Container>
            <Sidebar handleSidebar={handleSidebar} showSidebar={showSidebar}/>
            <Content>
              <Header handleSidebar={handleSidebar} />
              {children}
            </Content>
          </Container>
          <Player />
        </>
      )}

      {!localStorage.getItem("token") && (
        <Redirect to="/login"/>
      )}
    </>
  );
};

export default Main;