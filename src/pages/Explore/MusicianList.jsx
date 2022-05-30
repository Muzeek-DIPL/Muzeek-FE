import React, { useState } from "react";
import MusicianCardExplore from "./MusicianCardExplore";

export default function MusicianList(props) {
  const { entries } = props;
  const [likedMusician, setLikedMusician] = useState([]);
  return (
    <div className="d-flex flex-wrap py-3">
      {entries.map((item) => (
        <MusicianCardExplore
          key={item.id}
          id={item.user_id}
          profile={item.img_link}
          fullName={item.full_name}
          instrument={item.instrument}
          location={item.location}
          likes={item.likes}
          userLikedMusician={likedMusician}
        />
      ))}
    </div>
  );
}
