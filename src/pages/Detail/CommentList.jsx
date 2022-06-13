import { Icon } from "@iconify/react";
import { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { deleteComment } from "../../network/delete";
import { getComments } from "../../network/get";
import { postComment } from "../../network/post";
import { isLoggedIn } from "../../utils/helpers";
import Comment from "./Comment";
import CommentInput from "./CommentInput";

export default function CommentList({ musicianId, user }) {
  const [fetchError, setFetchError] = useState("");
  const [comments, setComments] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (musicianId !== undefined) {
      getComments(musicianId, setComments, setFetchError, setIsLoading);
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
      <h5 className="fw-bolder">
        Komentar {comments.length !== 0 ? `(${comments.length})` : ""}
      </h5>
      {comments.length === 0 && !isLoading && (
        <p className="text-secondary">Belum ada komentar...</p>
      )}
      {isLoggedIn() && (
        <CommentInput
          handleCommentPost={handleCommentPost}
          isSubmitting={submitting}
        />
      )}
      {!isLoading ? (
        comments.map((item) => (
          <Comment
            key={item.id}
            id={item.id}
            commenter={item.commenters.full_name}
            img={item.commenters.img_link}
            comment={item.text}
            dateCommented={item.created_at}
            handleDeleteComment={handleDeleteComment}
          />
        ))
      ) : (
        <div
          className="d-flex flex-wrap mt-4 justify-content-between"
          style={{ borderBottom: "1px solid #8F8D8D" }}
        >
          <Skeleton width={50} height={50} className="rounded-circle" />

          <div className="d-flex flex-column flex-fill ms-1 ms-md-4 w-75">
            <h6 className="fw-bolder">
              <Skeleton width={100} height={15} />
            </h6>
            <p>
              <Skeleton width={180} height={15} />
            </p>
            <p style={{ color: "#8F8D8D" }}>
              <Skeleton width={90} height={15} />
            </p>
          </div>
          <Icon
            icon="bi:trash-fill"
            color="#c4c4c4"
            width="18"
            height="18"
            className="align-self-end mb-3"
          />
        </div>
      )}
    </>
  );
}
