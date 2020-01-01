import React, { useState, useEffect } from "react";
import Axios from "axios";
import { UserInfo } from "./api";
import { styled } from "baseui";

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
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    setIsLoading(true);
    Axios.get("https://api.spotify.com/v1/me", {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    })
      .then(res => {
        setIsLoading(false);
        setUserInfo(res.data);
      })
      .catch(error => {
        console.log(error);
        setError(true);
      });
  }, []);

  return (
    <div style={{ display: "flex", justifyContent: "flex-end" }}>
      <ProfileContainer>
        {isLoading ? (
          <div>Loading...</div>
        ) : error ? (
          <div>Something went wrong try again!</div>
        ) : (
          userInfo && (
            <>
              <p>{userInfo.display_name}</p>
              <IMG src={userInfo.images[0].url} alt="Profile" />
            </>
          )
        )}
      </ProfileContainer>
    </div>
  );
};

export default Profile;
