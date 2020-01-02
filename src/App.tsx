import React from "react";
import "./App.css";
import Login from "./components/Login";
import { Route, Switch } from "react-router-dom";
import { Client as Styletron } from "styletron-engine-atomic";
import { Provider as StyletronProvider } from "styletron-react";
import { DarkTheme, BaseProvider } from "baseui";
import Dashboard from "./components/Dashboard";

const Theme = DarkTheme;
document.body.style.backgroundColor = Theme.colors.background;
document.body.style.color = Theme.colors.colorPrimary;
const engine = new Styletron();

const App = () => {
  return (
    <StyletronProvider value={engine}>
      <BaseProvider theme={Theme}>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route>
            <Dashboard />
          </Route>
        </Switch>
      </BaseProvider>
    </StyletronProvider>
  );
};

export default App;
