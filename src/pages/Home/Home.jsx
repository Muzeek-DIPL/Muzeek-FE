import { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { getNewestMusician, getPopularMusician } from "../../network/get";
import cardStyles from ".//MusicianCardHome.module.css";
import styles from "./Home.module.css";
import MusicianCardHome from "./MusicianCardHome";
import SearchInputHome from "./SearchInputHome";

export default function Home() {
  const [fetchError, setFetchError] = useState("");
  const [popularMusicians, setPopularMusicians] = useState([]);
  const [newestMusicians, setNewestMusicians] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getPopularMusician(setPopularMusicians, setFetchError, setIsLoading);
    getNewestMusician(setNewestMusicians, setFetchError, setIsLoading);
  }, []);

  const renderSkeleton = () => {
    const skeletons = [];
    for (let i = 0; i < 4; i++) {
      skeletons.push(
        <div
          key={i}
          className={`${cardStyles.container} mb-3 mb-md-0 d-inline-block border-0 card rounded`}
        >
          <Skeleton style={{ height: "100%" }} />
        </div>
      );
    }
    return skeletons;
  };

  return (
    <div className="pb-3">
      <div className={styles.hero}>
        <div className={`${styles.overlay} p-2 p-md-5`}>
          <div className="container mt-4">
            <div className="fw-bold fs-1 text-white">
              <p className="mb-0">Cari musisi yang pas</p>
              <p>buat keperluanmu</p>
            </div>
            <SearchInputHome />
          </div>
        </div>
      </div>
      <div className="container my-5">
        <h2 className="fw-bold">Musisi popular</h2>
        <div className="d-flex flex-wrap justify-content-between py-3">
          {isLoading ? (
            <>{renderSkeleton()}</>
          ) : (
            popularMusicians.map((item) => (
              <MusicianCardHome
                key={item.id}
                id={item.user_id}
                profile={item.img_link}
                fullName={item.full_name}
                instrument={item.instrument}
              />
            ))
          )}
        </div>
      </div>
      <div className="container my-5">
        <h2 className="fw-bold">Musisi terbaru</h2>
        <div className="d-flex flex-wrap justify-content-between py-3">
          {isLoading ? (
            <>{renderSkeleton()}</>
          ) : (
            newestMusicians.map((item) => (
              <MusicianCardHome
                key={item.id}
                id={item.user_id}
                profile={item.img_link}
                fullName={item.full_name}
                instrument={item.instrument}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
