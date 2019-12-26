import React, { useState, useEffect } from "react";
import Axios from "axios";
import { UserInfo } from "./api";

const Profile = () => {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);

  useEffect(() => {
    Axios.get("https://api.spotify.com/v1/me", {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    }).then(res => {
      setUserInfo(res.data);
    });
  }, []);

  return (
    <div>
      {userInfo && (
        <div>
          <h2>{userInfo.display_name}</h2>
          <img src={userInfo.images[0].url} alt="Profile" />
        </div>
      )}
    </div>
  );
};

export default Profile;
