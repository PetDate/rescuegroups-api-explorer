import React from "react";
import { Client as Styletron } from 'styletron-engine-atomic';
import { Provider as StyletronProvider } from 'styletron-react';
import { BaseProvider, LightTheme } from 'baseui';
import AppNavbar from "components/navbar/AppNavbar";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "pages/Home";
import Footer from "./footer/Footer";
import DogSearch from "pages/DogSearch";

const engine = new Styletron();

const App = () => {
  return (
    <StyletronProvider value={engine}>
      <BaseProvider theme={LightTheme}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            minHeight: "100vh",
          }}
        >
          <BrowserRouter>
            <AppNavbar />
            <Switch>
              <Route path="/" exact component={Home} />
              <Route path="/dogsearch" exact component={DogSearch} />
            </Switch>
            <Footer />
          </BrowserRouter>
        </div>
      </BaseProvider>
    </StyletronProvider>
  );
};

export default App;
