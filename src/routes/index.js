import React from "react";

import { Switch, Route, Redirect } from "react-router-dom";

import Main from "../components/Main";
import PageNotFound from "../components/pageNotFound";

import Login from "../pages/login/index";
import Browse from "../pages/browse";
import Category from "../pages/category";
import Playlist from "../pages/playlist";
import Album from "../pages/album";

const PrivateRoute = ({ children, ...rest }) => (
  <Route
    {...rest}
    render={() =>
      !!localStorage.getItem("token") ? children : <Redirect to="/login" />
    }
  />
);

const Routes = () => {
  return (
    <Switch>
        <Route path="/login">
          <Login />
        </Route>
        <Main>
          <Switch>
            <Redirect exact from="/" to="/browse/categories" />
            <Redirect exact from="/login" to="/browse/categories" />
            <Redirect exact from="/browse" to="/browse/categories" />
            <PrivateRoute path="/browse">
              <Browse />
            </PrivateRoute>
            <PrivateRoute path="/genre/:id">
              <Category />
            </PrivateRoute>
            <PrivateRoute path="/playlists/:id">
              <Playlist />
            </PrivateRoute>
            <PrivateRoute path="/albums/:id">
              <Album />
            </PrivateRoute>
            <Route>
              <PageNotFound />
            </Route> 
          </Switch>       
        </Main>
    </Switch>
  );
};

export default Routes;
