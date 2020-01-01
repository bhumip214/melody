import React from "react";
import "./App.css";
import Login from "./components/Login";
import SideNavBar from "./components/SideNavBar";
import Album from "./components/Album";
import Playlist from "./components/Playlist";
import Category from "./components/Category";
import Player from "./components/Player";
import NewReleases from "./components/NewReleases";
import Categories from "./components/Categories";
import FeaturedList from "./components/FeaturedList";
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
  overflow: "hidden",
  height: "100%"
});

const SideNavBarContainer = styled("div", {
  overflow: "scroll",
  width: "240px",
  borderRight: "1px solid grey"
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
                    <Route path="/playlists/:playlistId" component={Playlist} />
                    <Route path="/albums/:albumId" component={Album} />

                    <Route
                      path="/categories/:categoryId"
                      component={Category}
                    />

                    <Route path="/new-releases" component={NewReleases} />
                    <Route path="/featured-list" component={FeaturedList} />
                    <Route path="/categories" component={Categories} />
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
