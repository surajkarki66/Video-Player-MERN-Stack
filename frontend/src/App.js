import React from "react";
import { Route } from "react-router-dom";

import Dashboard from "./components/Dashboard/Dashboard";
import SignUp from "./components/Form/SignUp/SignUp";
import SignIn from "./components/Form/SignIn/SignIn";
import SignOut from "./components/SignOut/SignOut";
import Upload from "./components/Upload/Upload";
import VideoPlayer from "./components/VideoPlayer/VideoPlayer";

function App() {
  return (
    <React.Fragment>
      <Route exact path="/" component={Dashboard} />
      <Route exact path="/video/:videoTitle" component={VideoPlayer} />
      <Route exact path="/upload" component={Upload} />
      <Route exact path="/signIn" component={SignIn} />
      <Route exact path="/signUp" component={SignUp} />
      <Route exact path="/signOut" component={SignOut} />
    </React.Fragment>
  );
}

export default App;
