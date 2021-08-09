import React from "react";
import { register } from "../../slices/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import "./SignUp.scss";

const SignUp = () => {
  const [values, setValues] = React.useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const { status, user } = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();

  const onChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const { username, email, password, confirmPassword } = values;

    if (!username || !password || !email || !confirmPassword) {
      return;
    } else {
      const data = { username, email, password, confirmPassword };
      dispatch(register(data));
    }
  };
  return (
    <div className="signup">
      {user && status === "loggedin" && <Redirect to="/" />}
      <div className="form-container">
        <form onSubmit={onSubmit}>
          <div className="form-control">
            <label>username</label>
            <input
              type="text"
              name="username"
              placeholder="Enter your username"
              value={values.username}
              onChange={onChange}
            />
          </div>
          <div className="form-control">
            <label>email</label>
            <input
              type="text"
              name="email"
              placeholder="Enter your email address"
              value={values.email}
              onChange={onChange}
            />
          </div>
          <div className="form-control">
            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={values.password}
              onChange={onChange}
            />
          </div>
          <div className="form-control">
            <label>Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm your password"
              value={values.confirmPassword}
              onChange={onChange}
            />
          </div>
          <div className="form-control">
            <button type="submit" onClick={onSubmit}>
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
