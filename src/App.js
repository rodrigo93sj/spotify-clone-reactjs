import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import GlobalStyle from "./styles/global";
import { Wrapper } from "./styles/components";

import Routes from "./routes";
import store from "./store";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Wrapper>
          <Routes />
          <GlobalStyle />
        </Wrapper>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
