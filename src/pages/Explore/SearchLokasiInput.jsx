import { Icon } from "@iconify/react";
import styles from "./SearchLokasiInput.module.css";

export default function SearchLokasiInput(props) {
	const onChange = (e) => {
		props.onChange({ keyword: e.target.value });
	};
	return (
		<div className={`bg-white ps-2 rounded ${styles.searchbar}`}>
			<Icon icon="ant-design:search-outlined" color="#8f8d8d" />
			<input
				className={`${styles.input} p-2 rounded`}
				placeholder="Nama / lokasi"
				value={props.keyword}
				onChange={onChange}
			/>
		</div>
	);
}
