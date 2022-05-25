import { useEffect, useState } from "react";
import mockData from "../../mockMusician.json";
import styles from "./Home.module.css";
import MusicianCardHome from "./MusicianCardHome";
import SearchInputHome from "./SearchInputHome";
import { getPopularMusician, getNewestMusician } from "../../network/get";

export default function Home() {
  const [fetchError, setFetchError] = useState("");
  const [popularMusicians, setPopularMusicians] = useState([]);
  const [newestMusicians, setNewestMusicians] = useState([]);

  useEffect(() => {
    getPopularMusician(setPopularMusicians, setFetchError);
    getNewestMusician(setNewestMusicians, setFetchError);
  }, []);

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
          {popularMusicians.map((item) => (
            <MusicianCardHome
              key={item.id}
              id={item.id}
              profile={item.img_link}
              fullName={item.full_name}
              instrument={item.instrument}
            />
          ))}
        </div>
      </div>
      <div className="container my-5">
        <h2 className="fw-bold">Musisi terbaru</h2>
        <div className="d-flex flex-wrap justify-content-between py-3">
          {newestMusicians.map((item) => (
            <MusicianCardHome
              key={item.id}
              id={item.id}
              profile={item.img_link}
              fullName={item.full_name}
              instrument={item.instrument}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
