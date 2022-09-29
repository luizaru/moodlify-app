import React, { useState, useEffect, Children } from "react";
import useAuth from "./config/services/useAuth.js";
import useCheckin from "./config/services//useCheckin";
import theme from "./config/theme.js";
import { ThemeProvider } from "styled-components";
import GlobalStyles from "./config/GlobalStyles";
import Navbar from "./Components/Navbar";
import {
  Switch,
  Route,
  useLocation,
  useHistory,
  Redirect,
} from "react-router-dom";
import { initializeApp } from "firebase/app";
import firebaseConfig from "./config/firebase";
import Dash from "./Views/Dashboard";
import Signup from "./Views/Signup";
import DailyCheckin from "./Views/DailyCheckin";
import Account from "./Views/Account";
import Signin from "./Views/Signin";

function Protected({ authenticated, children, ...rest }) {
  debugger;
  return (
    <Route
      {...rest}
      render={({ location }) =>
        authenticated ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/signin",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [checkins, setCheckins] = useState([]);
  const location = useLocation();
  const history = useHistory();
  const app = initializeApp(firebaseConfig);
  const { getCheckins } = useCheckin();

  const { isAuthenticated, createEmailUser, signInEmailUser, signUserOut } =
    useAuth();

  

  useEffect(() => {
    if (isAuthenticated) {
      history.push(history.location.state.from.pathname);
    }
    return;
  }, [isAuthenticated]);

  const handleClick = (e) => {
    setMenuOpen(!menuOpen);
  };

  const handleOuterWrapperClick = (e) => {
    setMenuOpen(false);
  };

  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  return (
    <div>
      <ThemeProvider theme={theme}>
        {location.pathname !== "/signup" && location.pathname !== "/singin" && (
          <Navbar onClick={handleClick} open={menuOpen} signOut={signUserOut} />
        )}
        <GlobalStyles />
        <div
          onClick={handleOuterWrapperClick}
          style={{
            width: "100vw",
            horizontalScroll: "none",
            overflowX: "hidden",
            height: "100vh",
          }}
        >
          <Switch>
            <Protected authenticated={isAuthenticated} exact path="/">
              <Dash checkins={checkins} />
            </Protected>
            <Route path="/signup">
              <Signup createEmailUser={createEmailUser} />
            </Route>
            <Route path="/signin">
              <Signin signInEmailUser={signInEmailUser} />
            </Route>
            <Protected authenticated={isAuthenticated} path="/profile">
              <Account />
            </Protected>
            <Protected authenticated={isAuthenticated} exact path="/dailycheckin">
              <DailyCheckin />
            </Protected>
          </Switch>
        </div>
      </ThemeProvider>
    </div>
  );
}

export default App;
