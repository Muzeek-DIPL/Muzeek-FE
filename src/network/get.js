import { apiClient } from "../thirdparties/axios/apiClient";

export const getPopularMusician = (setData, setFetchError) => {
  apiClient
    .get(`${import.meta.env.VITE_BE_API_URL}/musicians?sort_by=likes`)
    .then((response) => {
      setData(response.data.data.data.slice(0, 4));
    })
    .catch((error) => {
      setFetchError(error.response.data.meta.message[0]);
    });
};

export const getNewestMusician = (setData, setFetchError) => {
  apiClient
    .get(`${import.meta.env.VITE_BE_API_URL}/musicians?sort_by=created_at`)
    .then((response) => {
      setData(response.data.data.data.slice(0, 4));
    })
    .catch((error) => {
      setFetchError(error.response.data.meta.message[0]);
    });
};

export const getMusicianDetail = (
  id,
  userId,
  setData,
  setIsMusicianLiked,
  setFetchError
) => {
  apiClient
    .get(`${import.meta.env.VITE_BE_API_URL}/musicians/${id}`)
    .then((response) => {
      setData(response.data.data);
      if (response.data.data.liked_by.includes(userId)) {
        setIsMusicianLiked(true);
      }
    })
    .catch((error) => {
      setFetchError(error.response.data.meta.message[0]);
    });
};

export const getMusicianByFilter = (
  filter,
  data,
  setData,
  setAllDataCount,
  setIsLoading,
  setIsLoadingMore,
  setFetchError
) => {
  let { keyword, instrument, sort_by, page } = filter;
  instrument = instrument.join();
  // console.log(
  //   `${
  //     import.meta.env.VITE_BE_API_URL
  //   }/musicians?keyword=${keyword}&sort_by=${sort_by}&instrument=${instrument}&page=${page}`
  // );
  apiClient
    .get(`${import.meta.env.VITE_BE_API_URL}/musicians`, {
      params: {
        keyword,
        sort_by,
        instrument,
        page,
      },
    })
    .then((response) => {
      setAllDataCount(response.data.data.total);
      if (page > 1) {
        setIsLoadingMore(true);
        setData([...data, ...response.data.data.data]);
      } else {
        setIsLoading(true);
        setData(response.data.data.data);
      }
    })
    .catch((error) => {
      setFetchError(error.response.data.meta.message[0]);
    })
    .finally(() => {
      setIsLoading(false);
      setIsLoadingMore(false);
    });
};

export const getComments = (id, setData, setFetchError) => {
  apiClient
    .get(`${import.meta.env.VITE_BE_API_URL}/comments/${id}`)
    .then((response) => {
      setData(response.data.data);
    })
    .catch((error) => {
      setFetchError(error.response.data.meta.message[0]);
    });
};
