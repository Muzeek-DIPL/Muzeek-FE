import Comment from "./Comment";
import CommentInput from "./CommentInput";
import { useEffect, useState } from "react";
import { getComments } from "../../network/get";
import { postComment } from "../../network/post";
import { deleteComment } from "../../network/delete";

export default function CommentList({ musicianId, user }) {
  const [fetchError, setFetchError] = useState("");
  const [comments, setComments] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  useEffect(() => {
    if (musicianId !== undefined) {
      getComments(musicianId, setComments, setFetchError);
    }
  }, [musicianId]);

  const handleCommentPost = (comment) => {
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

  const handleDeleteComment = (commentId) => {
    deleteComment(commentId, comments, setComments, setFetchError);
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
          handleDeleteComment={handleDeleteComment}
        />
      ))}
    </>
  );
}
