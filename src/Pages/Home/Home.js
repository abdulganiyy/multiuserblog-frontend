import React, { useState } from "react";
import "./Home.scss";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../slices/userSlice";
import { fetchPosts } from "../../slices/postsSlice";
import { Redirect, Link } from "react-router-dom";
import PostCard from "../../Components/PostCard/PostCard";

const Home = () => {
  const [values, setValues] = useState({
    username: "",
    password: "",
  });

  const { status, user } = useSelector((state) => state.userReducer);
  const { posts } = useSelector((state) => state.postsReducer);
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  const onChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const { username, password } = values;

    if (!username || !password) {
      return;
    } else {
      const data = { username, password };
      dispatch(login(data));
    }
  };

  return (
    <div className="home">
      {user && status === "loggedin" && <Redirect to="/" />}
      <div
        className={
          status === "loggedin"
            ? "form-container hide-form-container"
            : "form-container"
        }
      >
        <form>
          <div className="form-control">
            <label>username or email</label>
            <input
              type="text"
              name="username"
              placeholder="Enter your username or email address"
              value={values.username}
              onChange={onChange}
            />
          </div>
          <div className="form-control">
            <label>password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={values.password}
              onChange={onChange}
            />
          </div>
          <div className="form-control">
            <button type="submit" onClick={onSubmit}>
              Login
            </button>
            <span className="goto-signup">
              <Link to="/signup">Sign Up</Link>
            </span>
          </div>
        </form>
      </div>
      <div className="articles-wrapper">
        <h2>All Articles</h2>
        <div className="articles">
          {posts &&
            posts.map((post, index) => {
              return (
                <Link to={`/posts/${post._id}`}>
                  <PostCard post={post} />
                </Link>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default Home;
