import { get } from "jquery";
import { useState, useEffect } from "react";
import { json } from "react-router-dom";

const Commentcontent = ({ post_id, commentdata }) => {
  const getStringDate = (date) => {
    return new Date(date).toISOString().replace("T", " ").split(".")[0];
  };

  const commentfilter = commentdata.filter((it) => it.postid === post_id);

  const today = new Date(new Date().getTime() + 32400000)
    .toISOString()
    .split("T")[0];

  return (
    <>
      {commentfilter.map((it) => (
        <div className="commentlist">
          <span>{it.comment_id} </span>
          <span>
            {getStringDate(it.create_date).split(" ")[0] === today
              ? getStringDate(it.create_date)
              : getStringDate(it.create_date).split(" ")[0]}
          </span>
          <br />
          <span>{it.comment}</span>
        </div>
      ))}
    </>
  );
};

export default Commentcontent;
