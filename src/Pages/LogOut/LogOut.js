import React from "react";
import { Redirect } from "react-router-dom";
import { useDispatch } from "react-redux";
import { userActions } from "../../slices/userSlice";

const LogOut = () => {
  //   const { status } = useSelector((state) => state.userReducer);

  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(userActions.logout());
  }, [dispatch]);
  return <div>{<Redirect to="/" />}</div>;
};

export default LogOut;
