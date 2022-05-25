import { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import { useSearchParams } from "react-router-dom";
import { getMusicianByFilter } from "../../network/get";
import CategoryDropdown from "./CategoryDropdown";
import styles from "./Explore.module.css";
import MusicianList from "./MusicianList";
import SearchLokasiInput from "./SearchLokasiInput";
import SortDropdown from "./SortDropdown";

export default function Explore() {
  let [searchParams, setSearchParams] = useSearchParams();
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
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
      setFetchError
    );
  }, [filter]);

  const handleFilter = (value) => {
    setFilter({ ...filter, ...value });
  };

  const onLoadMore = async () => {
    setFilter({ ...filter, page: filter.page + 1 });
    getMusicianByFilter(
      filter,
      data,
      setData,
      setAllDataCount,
      setIsLoading,
      setFetchError
    );
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
              {isLoading ? (
                ""
              ) : isLoading ? (
                <Spinner />
              ) : data.length === allDataCount ? (
                <p className="text-center">Semua data telah ditampilkan.</p>
              ) : (
                <button
                  className={`${styles.button} py-1 px-3 rounded align-self-center`}
                  style={{ cursor: "pointer" }}
                  onClick={onLoadMore}
                >
                  Lihat lainnya
                </button>
              )}
            </>
          )
        ) : (
          <Spinner />
        )}
      </div>
    </div>
  );
}
