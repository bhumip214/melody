import React, { useState, useEffect, useContext } from "react";
import Axios from "axios";
import { UserInfo } from "./api";
import { styled } from "baseui";
import { AuthContext } from "../App";

const ProfileContainer = styled("div", {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "0px 20px",
  margin: "20px 40px",
  borderRadius: "30px",
  backgroundColor: "#1f1f1f",
  fontSize: "14px",
  fontWeight: "bold"
});

const IMG = styled("img", {
  width: "30px",
  height: "30px",
  borderRadius: "50%",
  marginLeft: "15px"
});

const Profile = () => {
  const auth = useContext(AuthContext);

  return (
    <div style={{ display: "flex", justifyContent: "flex-end" }}>
      {auth.userInfo && (
        <ProfileContainer>
          <p>{auth.userInfo.display_name}</p>
          <IMG src={auth.userInfo.images[0].url} alt="Profile" />
        </ProfileContainer>
      )}
    </div>
  );
};

export default Profile;
