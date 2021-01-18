import React from "react";
import { Client as Styletron } from 'styletron-engine-atomic';
import { Provider as StyletronProvider } from 'styletron-react';
import { BaseProvider, LightTheme } from 'baseui';
import AppNavbar from "./navbar/AppNavbar";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "pages/Home";

const engine = new Styletron();

const App = () => {
  return (
    <StyletronProvider value={engine}>
      <BaseProvider theme={LightTheme}>
        <AppNavbar />
        <BrowserRouter>
          <Switch>
            <Route path="/" exact component={Home}/>
          </Switch>
        </BrowserRouter>
      </BaseProvider>
    </StyletronProvider>
  );
};

export default App;
