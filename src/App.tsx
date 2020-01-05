import React, { useEffect, useState } from "react";
import "./App.css";
import Axios from "axios";
import { UserInfo } from "./components/api";
import Login from "./components/Login";
import { Route, Switch, Redirect } from "react-router-dom";
import { Client as Styletron } from "styletron-engine-atomic";
import { Provider as StyletronProvider } from "styletron-react";
import { DarkTheme, BaseProvider } from "baseui";
import Dashboard from "./components/Dashboard";

const Theme = DarkTheme;
document.body.style.backgroundColor = Theme.colors.background;
document.body.style.color = Theme.colors.colorPrimary;
const engine = new Styletron();

const getHash = () => {
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

  return hash;
};

const getToken = () => {
  const hash = getHash();
  if (hash.access_token !== undefined) {
    window.localStorage.setItem("token", hash.access_token);
    return hash.access_token;
  } else {
    return localStorage.getItem("token");
  }
};

interface IauthContext {
  setTokenStatus(status: TokenStatus): void;
  userInfo: UserInfo;
}

type TokenStatus = "validating" | "no-token" | "invalid" | "valid";

export const AuthContext = React.createContext<IauthContext>(
  {} as IauthContext
);

const App = () => {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const token = getToken();
  const [tokenStatus, setTokenStatus] = useState<TokenStatus>(
    token ? "validating" : "no-token"
  );

  useEffect(() => {
    if (token) {
      setTokenStatus("validating");

      Axios.get("https://api.spotify.com/v1/me", {
        headers: { Authorization: `Bearer ${token}` }
      })
        .then(res => {
          setUserInfo(res.data);
          setTokenStatus("valid");
        })
        .catch(error => {
          console.log(error);
          setTokenStatus("invalid");
        });
    } else {
      setTokenStatus("no-token");
    }
  }, [token]);

  return (
    <StyletronProvider value={engine}>
      <BaseProvider theme={Theme}>
        <Switch>
          <Route exact path="/login" component={Login} />
          {(tokenStatus === "no-token" || tokenStatus === "invalid") && (
            <Redirect to="/login" />
          )}

          {tokenStatus === "valid" && userInfo && (
            <AuthContext.Provider value={{ setTokenStatus, userInfo }}>
              <Route>
                <Dashboard />
              </Route>
            </AuthContext.Provider>
          )}
        </Switch>
      </BaseProvider>
    </StyletronProvider>
  );
};

export default App;
