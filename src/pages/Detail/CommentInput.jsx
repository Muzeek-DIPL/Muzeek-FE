import { useState } from "react";
import TextareaAutosize from "react-textarea-autosize";
import styles from "./CommentInput.module.css";
import { Spinner } from "react-bootstrap";

export default function CommentInput({ handleCommentPost, isSubmitting }) {
  const [comment, setComment] = useState("");

  const onChange = (e) => {
    setComment(e.target.value);
  };

  return (
    <div className={`${styles.container} d-flex flex-column rounded`}>
      <TextareaAutosize
        className={`${styles.input} w-100 p-2 border-0 rounded`}
        value={comment}
        type="textarea"
        placeholder="Tulis komentar..."
        onChange={onChange}
      />
      <button
        className={`${styles.button} rounded p-1 px-3 m-2 ms-auto`}
        type="button"
        disabled={isSubmitting}
        onClick={() => handleCommentPost(comment)}
      >
        {isSubmitting ? (
          <Spinner
            variant="light"
            animation="border"
            size="sm"
            aria-hidden="true"
          />
        ) : (
          "Post"
        )}
      </button>
    </div>
  );
}
