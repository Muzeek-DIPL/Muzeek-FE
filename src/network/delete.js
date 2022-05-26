import { apiClientPrivate } from "../thirdparties/axios/apiClientPrivate";

export const deleteComment = (
  commentId,
  comments,
  setComments,
  setFetchError
) => {
  apiClientPrivate
    .delete(`${import.meta.env.VITE_BE_API_URL}/comments/${commentId}`)
    .then((response) => {
      const newComments = comments.filter(
        (comment) => comment.id !== commentId
      );
      setComments(newComments);
    })
    .catch((error) => {
      setFetchError(error.response.data.meta.message[0]);
    });
};
