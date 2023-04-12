import React from "react";
import CommentsItem from "./CommentsItem";
import { IComment } from "../interfaces/recipe";

interface CommentsProps {
  comments?: IComment[];
}

const CommentsList = ({ comments }: CommentsProps) => {
  return (
    <div className="md:max-h-[500px] w-full mt-10 py-2  md:w-1/2 md:overflow-y-auto space-y-4">
      {comments?.length !== 0 &&
        comments?.map((comment) => (
          <CommentsItem key={comment._id} commentData={comment} />
        ))}
      {comments?.length === 0 && (
        <p className="text-center dark:text-white">No reviews yet.</p>
      )}
    </div>
  );
};

export default CommentsList;
