import { Icon } from "@iconify/react";
import { FormControl, InputGroup } from "react-bootstrap";

export default function SearchLokasiInput(props) {
  const onChange = (e) => {
    props.onChange({ keyword: e.target.value });
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
        value={props.keyword}
        name="keyword"
        onChange={onChange}
      />
    </InputGroup>
  );
}
