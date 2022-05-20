import { apiClient } from "../thirdparties/axios/apiClient";

export const putUpdateUserProfile = (
  form,
  setSubmitting,
  setFetchError,
  setIsEditing
) => {
  setSubmitting(true);
  apiClient
    .post(`${import.meta.env.VITE_BE_API_URL}/users/update`, form)
    .then((response) => {
      const newData = { ...response.data.data };
      delete newData.created_at;
      delete newData.updated_at;
      store.dispatch(login(newData));
    })
    .catch((error) => {
      setFetchError(error.response.data.meta.message[0]);
    })
    .finally(() => {
      setSubmitting(false);
      setIsEditing(false);
    });
};
