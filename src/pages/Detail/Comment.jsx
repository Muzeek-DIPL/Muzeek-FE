import { Icon } from "@iconify/react";
import { isLoggedIn } from "../../utils/helpers";

export default function Comment(props) {
  const { id, commenter, img, comment, dateCommented, handleDeleteComment } =
    props;
  const convertedDate = new Date(Date.parse(dateCommented)).toLocaleDateString(
    "en-GB"
  );

  return (
    <div
      className="d-flex flex-wrap mt-4 justify-content-between"
      style={{ borderBottom: "1px solid #8F8D8D" }}
    >
      {!img ? (
        <Icon
          icon="healthicons:ui-user-profile"
          color="#ccc"
          width="50"
          height="50"
          style={{ cursor: "pointer" }}
        />
      ) : (
        <img
          className="rounded-circle"
          src={img}
          alt="user"
          style={{ width: "50px", height: "50px", objectFit: "cover" }}
        />
      )}

      <div className="d-flex flex-column flex-fill ms-1 ms-md-4 w-75">
        <h6 className="fw-bolder">{commenter}</h6>
        <p>{comment}</p>
        <p style={{ color: "#8F8D8D" }}>{convertedDate}</p>
      </div>
      {isLoggedIn() && (
        <Icon
          icon="bi:trash-fill"
          color="#c4c4c4"
          width="18"
          height="18"
          className="align-self-end mb-3"
          style={{ cursor: "pointer" }}
          onClick={() => {
            if (!isLoggedIn()) {
              return;
            }
            handleDeleteComment(id);
          }}
        />
      )}
    </div>
  );
}
