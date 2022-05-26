import Comment from "./Comment";
import CommentInput from "./CommentInput";
import { useEffect, useState } from "react";
import { getComments } from "../../network/get";
import { postComment } from "../../network/post";

export default function CommentList({ musicianId, user }) {
  const [fetchError, setFetchError] = useState("");
  const [comments, setComments] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  useEffect(() => {
    getComments(musicianId, setComments, setFetchError);
  }, []);

  const handleCommentPost = (comment) => {
    console.log(user);
    postComment(
      musicianId,
      user,
      comment,
      comments,
      setComments,
      setSubmitting,
      setFetchError
    );
  };

  return (
    <>
      <h5 className="fw-bolder">Komentar ({comments.length})</h5>
      <CommentInput
        handleCommentPost={handleCommentPost}
        isSubmitting={submitting}
      />
      {comments.map((item) => (
        <Comment
          key={item.id}
          id={item.id}
          commenter={item.commenters.full_name}
          img={item.commenters.img_link}
          comment={item.text}
          dateCommented={item.created_at}
        />
      ))}
    </>
  );
}
