import { useState, useEffect } from "react";
import { json } from "react-router-dom";

const Commentcontent = ({ post_id, commentdata }) => {
  const getStringDate = (date) => {
    return new Date(date).toISOString().replace("T", " ").split(".")[0];
  };

  const commentfilter = commentdata.filter((it) => it.postid === post_id);

  return (
    <>
      {commentfilter.map((it) => (
        <div className="commentlist">
          <span>{it.comment_id} </span>
          <span>{getStringDate(it.create_date)}</span>
          <br />
          <span>{it.comment}</span>
        </div>
      ))}
    </>
  );
};

export default Commentcontent;
