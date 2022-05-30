import { Icon } from "@iconify/react";
import styles from "./MusicianCardExplore.module.css";
import { Link } from "react-router-dom";

export default function MusicianCardExplore(props) {
  const {
    id,
    profile,
    fullName,
    instrument,
    location,
    likes,
    userLikedMusician,
  } = props;

  return (
    <div
      className={`${styles.musician} p-0 mb-4 me-md-3 me-lg-4 d-flex flex-column rounded shadow`}
    >
      <img
        src={profile}
        alt="musician"
        className={`${styles.profile} rounded-top`}
      />
      <div className="d-flex flex-column justify-content-between p-4 rounded-bottom">
        <div className="d-flex justify-content-between bg-white w-100">
          <div className="d-block w-75">
            <h5 className="mb-1 text-truncate">{fullName}</h5>
            <h6 className="fw-normal text-truncate">{instrument}</h6>
            <h6
              className="fw-normal text-truncate"
              style={{ color: "#8F8D8D" }}
            >
              {location}
            </h6>
          </div>
          <div className=" text-center">
            {userLikedMusician ? (
              <Icon icon="ant-design:heart-filled" color="#ea2323" width="31" />
            ) : (
              <Icon
                icon="ant-design:heart-outlined"
                color="#ea2323"
                width="31"
              />
            )}
            <p>
              {likes > 999
                ? `${Number.parseFloat(likes / 1000).toPrecision(2)}k`
                : likes}
            </p>
          </div>
        </div>
        <Link
          className="nav-link text-black p-0"
          style={{ width: "fit-content" }}
          to={`/musician/${id}`}
        >
          Lebih Lanjut ›
        </Link>
      </div>
    </div>
  );
}
