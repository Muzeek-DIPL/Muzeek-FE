import { Icon } from "@iconify/react";
import { useState } from "react";
import { FormControl, InputGroup } from "react-bootstrap";

export default function SearchLokasiInput(props) {
  const [keyword, setKeyword] = useState(props.keyword);
  const onKeyDown = (e) => {
    if (e.key === "Enter") {
      props.onKeyDown({ keyword: e.target.value });
    }
  };
  return (
    <InputGroup style={{ width: "250px" }}>
      <InputGroup.Text
        className="rounded-start bg-white border-end-0"
        style={{ zIndex: 10 }}
      >
        <Icon icon="bi:search" width="15" color="#8f8d8d" />
      </InputGroup.Text>
      <FormControl
        placeholder="Cari lokasi / nama musisi"
        value={keyword}
        name="keyword"
        onKeyDown={onKeyDown}
        onChange={(e) => setKeyword(e.target.value)}
      />
    </InputGroup>
  );
}
