import React, { useState, useEffect, useRef } from "react";
import { Switch, Route, useLocation } from "react-router-dom";

import { Container, NavBar, Tab, StyledNavLink, Main } from "./styles";

import Categories from "../categories/index";
import Releases from "../releases/index";
import Featured from "../featured/index";
import PageNotFound from "../../components/pageNotFound";

const Browse = () => {
  const main = useRef(null);
  let location = useLocation();
  const [borderBottomColor, setBorderBottomColor] = useState("#181818");

  const onScroll = () => {
    const element = main.current.scrollTop;
    if (element > 80) {
      setBorderBottomColor("#3d3d3d");
    } else {
      setBorderBottomColor("#181818");
    }
  };

  useEffect(() => {
    const element = main.current;

    element.addEventListener("scroll", onScroll);

    return () => element.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const element = main.current;
    element.scrollTo(0, 0);
  }, [main, location]);

  return (
    <Container ref={main}>
      <NavBar style={{ borderBottomColor }}>
        <div>
          <h1>Navegar</h1>
        </div>

        <nav>
          <Tab>
            <StyledNavLink to="/browse/categories">
              Gêneros e momentos
            </StyledNavLink>
          </Tab>
          <Tab>
            <StyledNavLink to="/browse/new-releases">Lançamentos</StyledNavLink>
          </Tab>
          <Tab>
            <StyledNavLink to="/browse/featured">Destaques</StyledNavLink>
          </Tab>
        </nav>
      </NavBar>

      <Main>
        <Switch>
          <Route path="/browse/categories">
            <Categories />
          </Route>
          <Route path="/browse/new-releases">
            <Releases />
          </Route>
          <Route path="/browse/featured">
            <Featured />
          </Route>
          <Route>
            <PageNotFound />
          </Route>
        </Switch>
      </Main>
    </Container>
  );
};

export default Browse;