import React from "react";
import "./App.css";
import Login from "./components/Login";
import SideNavBar from "./components/SideNavBar";
import Dashboard from "./components/Dashboard";
import Album from "./components/Album";
import Playlist from "./components/Playlist";
import Player from "./components/Player";
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
  flexDirection: "column",
  height: "100vh"
});

const TopContainer = styled("div", {
  display: "flex",
  justifyContent: "space-between",
  overflow: "hidden"
});

const SideNavBarContainer = styled("div", {
  overflow: "scroll",
  width: "240px"
});

const RightContainer = styled("div", {
  marginleft: "255px",
  overflow: "scroll",
  width: "100%"
});

const App = () => {
  return (
    <StyletronProvider value={engine}>
      <BaseProvider theme={Theme}>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route>
            <MainContainer>
              <TopContainer>
                <SideNavBarContainer>
                  <SideNavBar />
                </SideNavBarContainer>

                <RightContainer>
                  <Switch>
                    <Route
                      path="/dashboard/playlists/:playlistId"
                      component={Playlist}
                    />
                    <Route
                      path="/dashboard/albums/:albumId"
                      component={Album}
                    />

                    <Route path="/dashboard" component={Dashboard} />
                  </Switch>
                </RightContainer>
              </TopContainer>
              <Player />
            </MainContainer>
          </Route>
        </Switch>
      </BaseProvider>
    </StyletronProvider>
  );
};

export default App;
