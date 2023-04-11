import { FormEvent, useState } from "react";
import ReactStars from "react-stars";
import useComment from "../hooks/useComment";
import { useAuthContext } from "../hooks/useAuthContext";

const CommentsForm = () => {
  const { state } = useAuthContext();
  const { addComment, isLoading, error } = useComment();
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(5);
  const ratingChanged = (newRating: any) => {
    setRating(newRating);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const newComment = {
      text: comment,
      rating,
      createdBy: {
        user_id: state.user?.user_id,
        username: state.user?.username,
      },
    };
    await addComment(newComment);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label className="text-gray-700 dark:text-white">
            Leave a review:
          </label>
        </div>
        <div>
          <ReactStars
            value={rating}
            count={5}
            onChange={ratingChanged}
            size={32}
            color2={"#ffd700"}
          />
        </div>
        <textarea
          onChange={(e) => setComment(e.target.value)}
          value={comment}
          id="comment"
          cols={30}
          rows={3}
          className="dark:text-white dark:bg-gray-500 px-2 py-1 focus:outline-none"
        />
        <div>
          <button
            type="submit"
            className="text-white w-full bg-navpink rounded py-2"
          >
            Add comment
          </button>
        </div>
      </form>
    </div>
  );
};

export default CommentsForm;
