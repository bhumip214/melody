import React, { useState, useEffect } from "react";

export const authEndpoint = "https://accounts.spotify.com/authorize";

const clientId = process.env.REACT_APP_CLIENT_ID;
const redirectUri = "http://localhost:3000/";
const scopes = ["user-read-currently-playing", "user-read-playback-state"];

// Get the hash of the url
const hash = window.location.hash
  .substring(1)
  .split("&")
  .reduce(function(initial, item) {
    if (item) {
      var parts = item.split("=");
      initial[parts[0]] = decodeURIComponent(parts[1]);
    }
    return initial;
  }, {} as Record<string, string>);
window.location.hash = "";

const Login = () => {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    let _token = hash.access_token;
    if (_token) {
      setToken(_token);
    }
  }, []);

  return (
    <div>
      {!token && (
        <a
          className="btn btn--loginApp-link"
          href={`${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
            "%20"
          )}&response_type=token&show_dialog=true`}
        >
          Login to Spotify
        </a>
      )}
      {token && <div> Dashboard </div>}
    </div>
  );
};

export default Login;
