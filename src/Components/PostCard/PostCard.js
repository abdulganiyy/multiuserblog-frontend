import React from "react";

import ellipsize from "ellipsize";

import img from "../../images/image1.jpg";
import "./PostCard.scss";

const PostCard = ({ post }) => {
  return (
    <div className="post-card">
      <img alt="post" src={post.coverPhoto ? post.coverPhoto : img} />
      <p>
        {post.body
          ? ellipsize(post.body, 200)
          : "Lorem ipsum dolor sit amet, consectetur ipsum dolor sit amet, consecteturipsum dolor sit amet, consecteturipsum dolor sit amet, consectetur ipsum dolor sit amet, consecteturipsum dolor sit amet, consecteturipsum dolor sit amet, consectetur"}
      </p>
    </div>
  );
};

export default PostCard;
