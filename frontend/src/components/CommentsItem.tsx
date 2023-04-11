import React from "react";
import { IComment } from "../interfaces/recipe";

interface CommentItemProps {
  commentData?: IComment;
}

const CommentsItem = ({ commentData }: CommentItemProps) => {
  return (
    <div className="bg-white rounded-lg px-4 py-2 max-w-md">
      <div>
        <h4>{commentData?.createdBy.username}</h4>
        <em>{commentData?.createdAt}</em>
      </div>
      <p>{commentData?.text}</p>
    </div>
  );
};

export default CommentsItem;
