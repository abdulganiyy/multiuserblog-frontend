import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.scss";

import Menubar from "./Components/Menubar/Menubar";
import Home from "./Pages/Home/Home";
import NewPost from "./Pages/NewPost/NewPost";
import SinglePost from "./Pages/SinglePost/SinglePost";
import UserProfile from "./Pages/UserProfile/UserProfile";
import SignUp from "./Pages/SignUp/SignUp";
import LogOut from "./Pages/LogOut/LogOut";

function App() {
  return (
    <div>
      <Router>
        <Menubar />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/all-posts" component={Home} />
          <Route path="/new-post" component={NewPost} />
          <Route path="/user-profile" component={UserProfile} />
          <Route path="/logout" component={LogOut} />
          <Route path="/signup" component={SignUp} />
          <Route path="/posts/:id" component={SinglePost} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
