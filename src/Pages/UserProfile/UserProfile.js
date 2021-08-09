import React from "react";
import { useDispatch, useSelector } from "react-redux";
import "./UserProfile.scss";
import img from "../../images/avatar.png";
import { updateProfile } from "../../slices/userSlice";

const UserProfile = () => {
  const [username, setUsername] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [job, setJob] = React.useState("");
  const [bio, setBio] = React.useState("");
  const [avatar, setAvatar] = React.useState("");
  const [previewSource, setPreviewSource] = React.useState("");

  const { user } = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();

  React.useEffect(() => {
    setAvatar(user.avatar);
    setEmail(user.email);
    setUsername(user.username);
    setJob(user.job);
    setBio(user.bio);
  }, [user]);

  const fileInputHandler = (e) => {
    const file = e.target.files[0];

    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onloadend = () => {
      setPreviewSource(reader.result);
    };
  };

  const onChangeHandler = (e) => {
    if (e.target.name === "username") {
      return setUsername(e.target.value);
    } else if (e.target.name === "email") {
      return setEmail(e.target.value);
    } else if (e.target.name === "job") {
      return setJob(e.target.value);
    } else if (e.target.name === "bio") {
      return setBio(e.target.value);
    } else {
      return setEmail(e.target.value);
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (!previewSource || !username || !email || !job || !bio) {
      return;
    }

    dispatch(
      updateProfile({ username, email, job, bio, avatar: previewSource })
    );
  };
  return (
    <div className="user-profile">
      <div className="form-container">
        <form onSubmit={onSubmit}>
          {user && avatar && <img alt="user" src={avatar} />}
          {!user.avatar && <img alt="user" src={img} />}
          <div className="form-control">
            <input type="file" name="photo" onChange={fileInputHandler} />
          </div>
          <div className="form-control">
            <label>Username</label>
            <input
              type="text"
              name="username"
              value={username}
              onChange={onChangeHandler}
            />
          </div>
          <div className="form-control">
            <label>Email</label>
            <input
              type="text"
              name="email"
              value={email}
              onChange={onChangeHandler}
            />
          </div>
          <div className="form-control">
            <label>Work</label>
            <input
              type="text"
              name="job"
              value={job}
              onChange={onChangeHandler}
            />
          </div>
          <div className="form-control bio">
            <label>Bio</label>
            <input
              type="text"
              name="bio"
              value={bio}
              onChange={onChangeHandler}
            />
          </div>
          <div className="form-control">
            <button type="submit">Update</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserProfile;
