import React from "react";
import { H1 } from "baseui/typography";
import { styled } from "baseui";
import { Button } from "baseui/button";

const Centered = styled("div", {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh"
});

export const authEndpoint = "https://accounts.spotify.com/authorize";

const clientId = process.env.REACT_APP_CLIENT_ID;
const redirectUri = "http://localhost:3000/";
const scopes = ["user-read-currently-playing", "user-read-playback-state"];

const Login = () => {
  return (
    <Centered>
      <header>
        <H1>Melody</H1>
      </header>
      <Button
        $as="a"
        href={`${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
          "%20"
        )}&response_type=token&show_dialog=true`}
      >
        Login to Spotify
      </Button>
    </Centered>
  );
};

export default Login;
