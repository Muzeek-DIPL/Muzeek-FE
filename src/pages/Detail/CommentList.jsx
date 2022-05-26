import Comment from "./Comment";
import CommentInput from "./CommentInput";
import { useEffect, useState } from "react";
import { getComments } from "../../network/get";

export default function CommentList({ musicianId }) {
  const [fetchError, setFetchError] = useState("");
  const [comments, setComments] = useState([]);
  useEffect(() => {
    getComments(musicianId, setComments, setFetchError);
  }, []);

  return (
    <>
      <h5 className="fw-bolder">Komentar ({comments.length})</h5>
      <CommentInput />
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
