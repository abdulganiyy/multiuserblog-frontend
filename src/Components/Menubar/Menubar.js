import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import "./Menubar.scss";
import avatar from "../../images/avatar.png";
import { useHistory } from "react-router-dom";

const Menubar = () => {
  const [showSidebar, setShowSidebar] = React.useState(false);
  const [activePage, setActivePage] = React.useState("home");

  let history = useHistory();

  const { user, status } = useSelector((state) => state.userReducer);
  console.log(user, status);

  const sidebarHandler = () => {
    setShowSidebar(!showSidebar);
  };

  React.useEffect(() => {
    const pathname = window.location.pathname;
    const path = pathname === "/" ? "home" : pathname.substr(1);
    setActivePage(path);
  }, []);

  const logoutButton = (
    <>
      {status === "loggedin" ? (
        <button className="button" onClick={() => history.push("/logout")}>
          Log Out
        </button>
      ) : null}
    </>
  );

  const userIcon = (
    <>
      {status === "loggedin" ? (
        !user.avatar ? (
          <img alt="user" src={avatar} />
        ) : (
          <img alt="user" src={user.avatar} />
        )
      ) : null}
    </>
  );
  return (
    <>
      <div className="toolbar">
        <div className="logo">
          <Link to="/">MULTIBLOG</Link>
        </div>
        <div className="nav-list-desktop">
          <div>
            <Link
              to="/all-posts"
              className={activePage === "all-posts" ? "active" : ""}
            >
              ALL POSTS
            </Link>
          </div>
          <div>
            <Link
              to="/new-post"
              className={activePage === "new-post" ? "active" : ""}
            >
              NEW POST
            </Link>
          </div>
        </div>
        <div className="user-icon">
          {logoutButton}
          <Link to="/user-profile">{userIcon}</Link>
        </div>
        <div className="nav-icon" onClick={sidebarHandler}>
          <i className="fa fa-align-justify" />
        </div>
      </div>
      <div
        className={showSidebar ? "side-drawer show-side-drawer" : "side-drawer"}
      >
        <ul>
          <li>
            <Link to="all-posts">All Posts</Link>
          </li>
          <li>
            <Link to="new-post">New Post</Link>
          </li>
          <li>{logoutButton}</li>
        </ul>
      </div>
    </>
  );
};

export default Menubar;
