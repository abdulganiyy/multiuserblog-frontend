import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPost } from "../../slices/postsSlice";
import "./SinglePost.scss";
import moment from "moment";

const SinglePost = ({ match }) => {
  const id = match.params.id;

  const { post } = useSelector((state) => state.postsReducer);
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(fetchPost(id));
  }, [dispatch, id]);

  console.log(post);
  return (
    <div className="singlepost-container">
      {post && (
        <div className="singlepost">
          <div className="singlepost-header">
            <div className="usericon-container">
              {post.user.avatar ? (
                <img alt="post.user.username" src={post.user.avatar} />
              ) : (
                <i className="fa fa-user"></i>
              )}
            </div>
            <div>
              <div>{post.user.username}</div>
              <div>{moment(post.createdAt).format("MMM DD YYYY")}</div>
            </div>
          </div>
          <h2>{post.title}</h2>
          <img alt="postimg" src={post.coverPhoto} />
          <div className="singlepost-body">{post.body}</div>
          <div className="singlepost-footer">
            Posted {moment(post.createdAt).fromNow()}
          </div>
        </div>
      )}
    </div>
  );
};

export default SinglePost;
