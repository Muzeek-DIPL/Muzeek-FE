import { Icon } from "@iconify/react";
import { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getMusicianDetail } from "../../network/get";
import { putUpdateLikes } from "../../network/put";
import { isLoggedIn } from "../../utils/helpers";
import CommentList from "./CommentList";
import styles from "./Detail.module.css";

export default function Detail() {
  const user = useSelector((state) => state.user);
  const { id } = useParams();
  const [fetchError, setFetchError] = useState("");
  const [musicianDetail, setMusicianDetail] = useState({});
  const [isMusicianLiked, setIsMusicianLiked] = useState(false);
  const [submittingLike, setSubmittingLike] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getMusicianDetail(
      id,
      user.id,
      setMusicianDetail,
      setIsMusicianLiked,
      setFetchError,
      setIsLoading
    );
  }, []);

  const onLike = () => {
    if (!isLoggedIn()) {
      return;
    }

    putUpdateLikes(
      musicianDetail.id,
      isMusicianLiked,
      musicianDetail,
      setMusicianDetail,
      setIsMusicianLiked,
      setSubmittingLike,
      setFetchError
    );
  };

  return (
    <>
      <div className="container d-flex flex-column flex-md-row justify-content-between py-4">
        <div className="d-flex flex-column">
          <div className="d-flex flex-column flex-md-row">
            {!isLoading ? (
              <img
                src={musicianDetail.img_link}
                alt="musician"
                className={`${styles.profile} rounded`}
              />
            ) : (
              <Skeleton width={250} height={360} />
            )}
            <div className="ms-md-4 mt-4 mt-md-0">
              <h2 className="fw-bolder mb-1">
                {!isLoading ? (
                  musicianDetail.full_name
                ) : (
                  <Skeleton width={120} />
                )}
              </h2>
              <h5>
                {!isLoading ? (
                  musicianDetail.instrument
                ) : (
                  <Skeleton width={75} />
                )}
              </h5>
              <div className="d-flex my-2">
                <button
                  className="p-0 border-0 bg-white"
                  disabled={!isLoggedIn() || submittingLike}
                >
                  {isMusicianLiked ? (
                    <Icon
                      icon="ant-design:heart-filled"
                      color="#ea2323"
                      width="24"
                      height="24"
                      onClick={onLike}
                    />
                  ) : (
                    <Icon
                      icon="ant-design:heart-outlined"
                      color="#ea2323"
                      width="24"
                      height="24"
                      onClick={onLike}
                    />
                  )}
                </button>
                <p className="ms-1 my-0">
                  {!isLoading ? musicianDetail.likes : <Skeleton width={15} />}
                </p>
              </div>
              <p style={{ color: "#8F8D8D" }}>
                {!isLoading ? (
                  musicianDetail.location
                ) : (
                  <Skeleton width={150} />
                )}
              </p>
              <div>
                <h5 className="fw-bolder mt-5">Tentang</h5>
                <p>
                  {!isLoading ? (
                    musicianDetail.about
                  ) : (
                    <Skeleton width={100} count={4} />
                  )}
                </p>
              </div>
              <div className={`d-md-none p-md-4 rounded ms-md-4 mt-5`}>
                <h5 className="fw-bolder mb-4">Kontak</h5>
                <div className="d-flex">
                  <Icon
                    icon="akar-icons:whatsapp-fill"
                    color="#8f8d8d"
                    width="20"
                    height="20"
                  />
                  <p className="ms-2" style={{ color: "#8F8D8D" }}>
                    {!isLoading ? (
                      musicianDetail.email
                    ) : (
                      <Skeleton width={130} />
                    )}
                  </p>
                </div>

                <div className="d-flex">
                  <Icon
                    icon="carbon:email"
                    color="#8f8d8d"
                    width="20"
                    height="20"
                  />
                  <p className="ms-2" style={{ color: "#8F8D8D" }}>
                    {!isLoading ? (
                      musicianDetail.phone
                    ) : (
                      <Skeleton width={130} />
                    )}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="py-5">
            <CommentList musicianId={musicianDetail.id} user={user} />
          </div>
        </div>
        <div
          className={`d-none d-md-block p-md-4 rounded ms-md-4 mt-3 mt-md-0 ${styles.sticky}`}
        >
          <h5 className="fw-bolder mb-4">Kontak</h5>

          <div className="d-flex">
            <Icon
              icon="akar-icons:whatsapp-fill"
              color="#8f8d8d"
              width="20"
              height="20"
            />
            <p className="ms-2" style={{ color: "#8F8D8D" }}>
              {!isLoading ? musicianDetail.email : <Skeleton width={130} />}
            </p>
          </div>

          <div className="d-flex">
            <Icon icon="carbon:email" color="#8f8d8d" width="20" height="20" />
            <p className="ms-2" style={{ color: "#8F8D8D" }}>
              {!isLoading ? musicianDetail.phone : <Skeleton width={130} />}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
