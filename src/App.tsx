import React from "react";
import "./App.css";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import { Route } from "react-router-dom";
import { Client as Styletron } from "styletron-engine-atomic";
import { Provider as StyletronProvider } from "styletron-react";
import { LightTheme, DarkTheme, BaseProvider, styled } from "baseui";

const Theme = DarkTheme;
document.body.style.backgroundColor = Theme.colors.background;

const engine = new Styletron();

const Centered = styled("div", {
  textAlign: "center",
  paddingLeft: "20px"
});

const App = () => {
  return (
    <StyletronProvider value={engine}>
      <BaseProvider theme={Theme}>
        <Centered>
          <Route exact path="/" component={Login} />
        </Centered>
        <Route path="/dashboard" component={Dashboard} />
      </BaseProvider>
    </StyletronProvider>
  );
};

export default App;
