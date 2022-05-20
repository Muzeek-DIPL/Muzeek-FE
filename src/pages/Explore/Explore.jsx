import { useState } from "react";
import { Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import CategoryDropdown from "./CategoryDropdown";
import styles from "./Explore.module.css";
import MusicianList from "./MusicianList";
import SearchLokasiInput from "./SearchLokasiInput";
import SortDropdown from "./SortDropdown";

export default function Explore() {
  const keyword = useSelector((state) => state.keyword.keyword);
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [allDataCount, setAllDataCount] = useState(0);
  const [filter, setFilter] = useState({
    date_published: "desc",
    keyword: keyword,
    instrument: [
      "Vokal",
      "Gitar",
      "Bass",
      "Brass",
      "Perkusi",
      "Piano",
      "Strings",
    ],
  });

  const handleFilter = (value) => {
    setFilter({ ...filter, ...value });
  };

  const onLoadMore = async () => {
    setIsLoading(true);
    setIsLoading(false);
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
        <SearchLokasiInput onChange={handleFilter} keyword={filter.keyword} />
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
              <MusicianList entries={dataFilter?.user} />
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
