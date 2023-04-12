import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios, { AxiosError } from "axios";
import CommentsList from "./CommentsList";
import CommentsForm from "./CommentsForm";
import { IComment } from "../interfaces/recipe";
import { io } from "socket.io-client";

const Comments = () => {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [comments, setComments] = useState<IComment[]>([]);

  useEffect(() => {
    setIsLoading(true);
    const getAllComments = async () => {
      try {
        const res = await axios.get(
          `http://localhost:4000/api/recipes/${id}/comments`
        );

        setIsLoading(false);
        setComments(res.data);
      } catch (err) {
        setIsLoading(false);
        console.log((err as AxiosError).response?.data);
      }
    };

    getAllComments();
  }, []);

  return (
    <div className="container my-10 flex flex-col items-center justify-between max-w-4xl mx-auto md:flex-row max-h-[600px] overflow-y-auto">
      <CommentsList comments={comments} />
      <CommentsForm />
    </div>
  );
};

export default Comments;
