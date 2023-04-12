import React from "react";
import CommentsItem from "./CommentsItem";
import { IComment } from "../interfaces/recipe";

interface CommentsProps {
  comments?: IComment[];
}

const CommentsList = ({ comments }: CommentsProps) => {
  return (
    <div className="max-h-[600px] overflow-y-auto">
      {comments &&
        comments.length !== 0 &&
        comments.map((comment) => (
          <CommentsItem key={comment._id} commentData={comment} />
        ))}
      {comments?.length === 0 && <p>No reviews yet.</p>}
    </div>
  );
};

export default CommentsList;
