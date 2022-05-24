import { apiClient } from "../thirdparties/axios/apiClient";

export const getPopularMusician = (setData, setFetchError) => {
  apiClient
    .get(`${import.meta.env.VITE_BE_API_URL}/musicians?sort_by=likes`)
    .then((response) => {
      setData(response.data.data);
    })
    .catch((error) => {
      setFetchError(error.response.data.meta.message[0]);
    });
};

export const getNewestMusician = (setData, setFetchError) => {
  apiClient
    .get(`${import.meta.env.VITE_BE_API_URL}/musicians?sort_by=created_at`)
    .then((response) => {
      setData(response.data.data);
    })
    .catch((error) => {
      setFetchError(error.response.data.meta.message[0]);
    });
};

export const getMusicianDetail = (id, setData, setFetchError) => {
  apiClient
    .get(`${import.meta.env.VITE_BE_API_URL}/musicians/${id}`)
    .then((response) => {
      setData(response.data.data);
    })
    .catch((error) => {
      setFetchError(error.response.data.meta.message[0]);
    });
};
