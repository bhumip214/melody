import React, { useState, useEffect } from "react";
import Axios from "axios";
import { UserInfo } from "./api";
import { H6 } from "baseui/typography";
import { styled } from "baseui";

const ProfileContainer = styled("div", {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "40px",
  width: "160px"
});

const IMG = styled("img", {
  width: "30px",
  height: "30px",
  borderRadius: "50%",
  marginLeft: "15px"
});

const Profile = () => {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);

  useEffect(() => {
    Axios.get("https://api.spotify.com/v1/me", {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    })
      .then(res => {
        setUserInfo(res.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  return (
    <div style={{ display: "flex", justifyContent: "flex-end" }}>
      {userInfo && (
        <ProfileContainer>
          <H6 margin={0}>{userInfo.display_name}</H6>
          <IMG src={userInfo.images[0].url} alt="Profile" />
        </ProfileContainer>
      )}
    </div>
  );
};

export default Profile;
