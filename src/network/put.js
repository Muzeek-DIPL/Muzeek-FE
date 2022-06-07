import { apiClientPrivate } from "../thirdparties/axios/apiClientPrivate";
import { store } from "../thirdparties/redux/store";
import { login, togglePublish } from "../thirdparties/redux/userSlice";

export const putUpdateUserProfile = (
  isUserPublished,
  form,
  setSubmitting,
  setFetchError,
  setIsEditing
) => {
  setSubmitting(true);
  apiClientPrivate
    .put(`${import.meta.env.VITE_BE_API_URL}/users/update`, form)
    .then((responseUpdateUser) => {
      if (isUserPublished) {
        apiClientPrivate
          .put(`${import.meta.env.VITE_BE_API_URL}/users/update_instrument`, {
            instrument: form.instrument,
          })
          .then((responseUpdateInstrument) => {
            const newData = {
              ...responseUpdateUser.data.data,
              instrument: form.instrument,
              published: true,
            };
            console.log(newData);
            delete newData.created_at;
            delete newData.updated_at;
            store.dispatch(login(newData));
          })
          .catch((error) => {
            setFetchError(error.response.data.meta.message[0]);
          });
      } else {
        const newData = responseUpdateUser.data.data;
        console.log(newData);
        delete newData.created_at;
        delete newData.updated_at;
        store.dispatch(login(newData));
      }
    })
    .catch((error) => {
      setFetchError(error.response.data.meta.message[0]);
    })
    .finally(() => {
      setSubmitting(false);
      setIsEditing(false);
    });
};

export const putUpdateUserStatus = (
  setOpenConfirmation,
  setSubmitting,
  setFetchError
) => {
  setSubmitting(true);
  apiClientPrivate
    .put(`${import.meta.env.VITE_BE_API_URL}/users/publish`)
    .then((response) => {
      store.dispatch(togglePublish());
    })
    .catch((error) => {
      setFetchError(error.response.data.meta.message[0]);
    })
    .finally(() => {
      setSubmitting(false);
      setOpenConfirmation(false);
    });
};

export const putUpdateLikes = (
  id,
  isMusicianLiked,
  musicianDetail,
  setMusicianDetail,
  setIsMusicianLiked,
  setSubmittingLike,
  setFetchError
) => {
  setSubmittingLike(true);
  apiClientPrivate
    .put(`${import.meta.env.VITE_BE_API_URL}/musicians/${id}/like`)
    .then((response) => {
      if (isMusicianLiked) {
        setIsMusicianLiked(false);
        setMusicianDetail({
          ...musicianDetail,
          likes: response.data.data.likes,
        });
      } else {
        setIsMusicianLiked(true);
        setMusicianDetail({
          ...musicianDetail,
          likes: response.data.data.likes,
        });
      }
    })
    .catch((error) => {
      setFetchError(error.response.data.meta.message[0]);
    })
    .finally(() => {
      setSubmittingLike(false);
    });
};
