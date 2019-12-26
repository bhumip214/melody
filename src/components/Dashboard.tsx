import React from "react";
import SideNavBar from "./SideNavBar";
import Profile from "./Profile";
import { styled } from "baseui";

const MainContainer = styled("div", {
  display: "flex",
  justifyContent: "space-between"
});

const RightContainer = styled("div", {
  marginleft: "255px",
  width: "100%",
  backgroundColor: ""
});
const Dashboard = () => {
  return (
    <MainContainer>
      <SideNavBar />
      <RightContainer>
        <Profile />
      </RightContainer>
    </MainContainer>
  );
};

export default Dashboard;
