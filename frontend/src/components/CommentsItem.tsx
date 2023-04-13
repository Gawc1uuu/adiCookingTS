import React from "react";
import { IComment } from "../interfaces/recipe";
import deleteIcon from "../assets/delete.svg";
import { useAuthContext } from "../hooks/useAuthContext";
import axios from "axios";
import { useParams } from "react-router-dom";
import { socket } from "../App";
import ReactStars from "react-stars";
import { formatDistanceToNow } from "date-fns";

interface CommentItemProps {
  commentData?: IComment;
}

const CommentsItem = ({ commentData }: CommentItemProps) => {
  const { id } = useParams();
  const { state } = useAuthContext();

  const deleteHandler = async () => {
    axios
      .delete(
        `https://adicooking-api.onrender.com/api/recipes/${id}/comments/${commentData?._id}`
      )
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });

    socket.emit("deleteComment", commentData?._id);
  };

  return (
    <div className="relative group bg-white rounded-lg px-4 py-2 max-w-md break-words dark:bg-gray-500 hover:-translate-y-1 transition duration-100">
      <div>
        <div className="flex items-center space-x-2">
          <h4 className="font-semibold mb-0 dark:text-white">
            {commentData?.createdBy.username}
          </h4>
          <ReactStars
            value={commentData?.rating}
            count={5}
            size={20}
            color2={"#ffd700"}
            edit={false}
          />
        </div>
        <p className="text-xs text-gray-400 mt-0 dark:text-gray-300">
          {formatDistanceToNow(new Date(commentData!.createdAt), {
            addSuffix: true,
          })}
        </p>
      </div>
      <p className="py-1 dark:text-white">{commentData?.text}</p>
      {state.user?.user_id === commentData?.createdBy.user_id && (
        <div>
          <img
            onClick={deleteHandler}
            className="hidden absolute invert-[60%] top-1 right-2 w-6 transition-all group-hover:inline-block hover:invert-0 hover:cursor-pointer dark:invert-[70%] dark:hover:invert-[100%]"
            src={deleteIcon.toString()}
            alt="trashcan"
          />
        </div>
      )}
    </div>
  );
};

export default CommentsItem;
