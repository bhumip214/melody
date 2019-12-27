import React from "react";
import "./App.css";
import Login from "./components/Login";
import SideNavBar from "./components/SideNavBar";
import Dashboard from "./components/Dashboard";
import { Route, Switch } from "react-router-dom";
import { Client as Styletron } from "styletron-engine-atomic";
import { Provider as StyletronProvider } from "styletron-react";
import { DarkTheme, BaseProvider, styled } from "baseui";

const Theme = DarkTheme;
document.body.style.backgroundColor = Theme.colors.background;
document.body.style.color = Theme.colors.colorPrimary;
const engine = new Styletron();

const MainContainer = styled("div", {
  display: "flex",
  justifyContent: "space-between"
});

const RightContainer = styled("div", {
  marginleft: "255px",
  width: "100%",
  backgroundColor: ""
});

const App = () => {
  return (
    <StyletronProvider value={engine}>
      <BaseProvider theme={Theme}>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route>
            <MainContainer>
              <SideNavBar />
              <RightContainer>
                <Switch>
                  <Route path="/dashboard" component={Dashboard} />
                </Switch>
              </RightContainer>
            </MainContainer>
          </Route>
        </Switch>
      </BaseProvider>
    </StyletronProvider>
  );
};

export default App;
