import { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useSearchParams } from "react-router-dom";
import { getMusicianByFilter } from "../../network/get";
import CategoryDropdown from "./CategoryDropdown";
import styles from "./Explore.module.css";
import cardStyles from "./MusicianCardExplore.module.css";
import MusicianList from "./MusicianList";
import SearchLokasiInput from "./SearchLokasiInput";
import SortDropdown from "./SortDropdown";

export default function Explore() {
  let [searchParams, setSearchParams] = useSearchParams();
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [allDataCount, setAllDataCount] = useState(0);
  const [fetchError, setFetchError] = useState("");
  const [filter, setFilter] = useState({
    sort_by: "created_at",
    keyword:
      searchParams.get("keyword") !== null ? searchParams.get("keyword") : "",
    instrument: [
      "Vokal",
      "Gitar",
      "Bass",
      "Other",
      "Perkusi",
      "Piano",
      "Strings",
    ],
    page: 1,
  });

  useEffect(() => {
    getMusicianByFilter(
      filter,
      data,
      setData,
      setAllDataCount,
      setIsLoading,
      setIsLoadingMore,
      setFetchError
    );
  }, [filter]);

  const handleFilter = (value) => {
    setFilter({ ...filter, page: 1, ...value });
  };

  const onLoadMore = () => {
    setFilter((prev) => {
      const newFilter = { ...prev, page: prev.page + 1 };
      getMusicianByFilter(
        newFilter,
        data,
        setData,
        setAllDataCount,
        setIsLoading,
        setIsLoadingMore,
        setFetchError
      );
      return newFilter;
    });
  };

  const renderSkeleton = () => {
    const skeletons = [];
    for (let i = 0; i < 4; i++) {
      skeletons.push(
        <div
          className={`${cardStyles.musician} p-0 mb-4 me-md-3 me-lg-4 d-flex flex-column rounded shadow`}
        >
          <Skeleton
            className={`${cardStyles.profile} rounded-top`}
            height={240}
          />
          <div className="d-flex flex-column justify-content-between p-4 rounded-bottom">
            <div className="d-flex justify-content-between bg-white w-100">
              <div className="d-block w-75">
                <h5 className="mb-1 text-truncate">
                  <Skeleton />
                </h5>
                <h6 className="fw-normal text-truncate">
                  <Skeleton />
                </h6>
                <h6
                  className="fw-normal text-truncate"
                  style={{ color: "#8F8D8D" }}
                >
                  <Skeleton />
                </h6>
              </div>
              <div className=" text-center">
                <Skeleton width={31} height={31} />
                <p>
                  <Skeleton />
                </p>
              </div>
            </div>
            <p className="nav-link text-black p-0">
              <Skeleton width={100} />
            </p>
          </div>
        </div>
      );
    }
    return skeletons;
  };

  return (
    <div className="pb-3">
      <div className="container mt-4">
        <h1 className="fw-bold">Cari musisi</h1>
      </div>
      <div
        className="container mt-4 d-flex flex-column flex-md-row sticky-top bg-white w-100 py-4"
        style={{ zIndex: 1 }}
      >
        <SearchLokasiInput onKeyDown={handleFilter} keyword={filter.keyword} />
        <div className="d-flex flex-row mt-3 mt-md-0">
          <CategoryDropdown onClick={handleFilter} />
          <SortDropdown onClick={handleFilter} />
        </div>
      </div>
      <div className="container my-3 d-flex flex-column">
        {!isLoading ? (
          data.length === 0 ? (
            <p className="text-center">Tidak ditemukan hasil yang cocok.</p>
          ) : (
            <>
              <MusicianList entries={data} />
              {isLoadingMore ? (
                <Spinner
                  variant="dark"
                  animation="border"
                  size="sm"
                  aria-hidden="true"
                />
              ) : data.length === allDataCount ? (
                <p className="text-center">Semua data telah ditampilkan.</p>
              ) : (
                <button
                  className={`${styles.button} py-1 px-3 rounded align-self-center`}
                  style={{ cursor: "pointer" }}
                  onClick={onLoadMore}
                >
                  {isLoadingMore ? (
                    <Spinner
                      variant="dark"
                      animation="border"
                      size="sm"
                      aria-hidden="true"
                    />
                  ) : (
                    "Lihat lainnya"
                  )}
                </button>
              )}
            </>
          )
        ) : (
          <div className="d-flex flex-wrap py-3">
            <>{renderSkeleton()}</>
          </div>
        )}
      </div>
    </div>
  );
}
