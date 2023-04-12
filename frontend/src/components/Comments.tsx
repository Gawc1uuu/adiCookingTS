import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios, { AxiosError } from "axios";
import CommentsList from "./CommentsList";
import CommentsForm from "./CommentsForm";
import { IComment } from "../interfaces/recipe";
import { socket } from "../App";
import { useAuthContext } from "../hooks/useAuthContext";

const Comments = () => {
  const { state } = useAuthContext();
  const { id } = useParams();

  const [comments, setComments] = useState<IComment[]>([]);

  useEffect(() => {
    const getAllComments = async () => {
      try {
        const res = await axios.get(
          `http://localhost:4000/api/recipes/${id}/comments`
        );

        setComments(res.data);
      } catch (err) {
        console.log((err as AxiosError).response?.data);
      }
    };

    socket.off("newComment");
    socket.on("newComment", (data) => {
      console.log(data);
      setComments((prevState) => [...prevState, data]);
    });

    socket.on("deletedComment", (deletedCommentId) => {
      setComments((prevState) =>
        prevState.filter((comment) => comment._id !== deletedCommentId)
      );
    });

    getAllComments();
  }, [id]);

  return (
    <div
      className="container my-32  flex flex-col-reverse items-center justify-between max-w-4xl mx-auto md:space-y-0 md:items-start
     md:flex-row md:my-0"
    >
      <CommentsList comments={comments} />
      {state.user && <CommentsForm />}
      {!state.user && (
        <p className="text-gray-600  dark:text-white">
          Log in to leave a review!
        </p>
      )}
    </div>
  );
};

export default Comments;
