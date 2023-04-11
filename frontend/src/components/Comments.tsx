import React from "react";
import CommentsList from "./CommentsList";
import CommentsForm from "./CommentsForm";
import { IComment } from "../interfaces/recipe";

interface CommentsProps {
  comments?: IComment[];
}

const Comments = ({ comments }: CommentsProps) => {
  return (
    <div className="container my-10 flex flex-col items-center justify-between max-w-4xl mx-auto md:flex-row max-h-[600px] overflow-y-auto">
      <CommentsList comments={comments} />
      <CommentsForm />
    </div>
  );
};

export default Comments;
