import React from "react";
import "./NewPost.scss";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { createPost } from "../../slices/postsSlice";

const NewPost = () => {
  const [values, setValues] = React.useState({
    title: "",
    coverPhoto: "",
    body: "",
  });

  const { status } = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();

  const onChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  const fileInputHandler = (e) => {
    const file = e.target.files[0];

    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onloadend = () => {
      setValues({
        ...values,
        [e.target.name]: reader.result,
      });
    };
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const { title, coverPhoto, body } = values;
    if (!title || !coverPhoto || !body) {
      return;
    } else {
      dispatch(createPost({ title, coverPhoto, body }));
      setValues({
        title: "",
        coverPhoto: "",
        body: "",
      });
    }
  };

  return (
    <div className="new-post">
      {status === "loggedout" ? <Redirect to="/" /> : null}
      <div className="form-container">
        <form onSubmit={onSubmit}>
          <div className="form-control">
            <input
              type="text"
              name="title"
              value={values.title}
              placeholder="Title"
              onChange={onChange}
            />
          </div>
          <div className="form-control">
            <input type="file" name="coverPhoto" onChange={fileInputHandler} />
          </div>
          <div className="form-control">
            <textarea
              name="body"
              value={values.body}
              placeholder="Whats on your mind"
              onChange={onChange}
              rows="4"
              cols="50"
            ></textarea>
          </div>
          <div className="form-control">
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewPost;
