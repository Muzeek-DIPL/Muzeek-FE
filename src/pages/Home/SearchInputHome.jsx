import { Icon } from '@iconify/react';
import { useState } from 'react';
import { Button, FormControl, InputGroup } from 'react-bootstrap';
import styles from './SearchInputHome.module.css';

export default function SearchInputHome() {
	const [keyword, setKeyword] = useState('');
	const onChange = (e) => {
		setKeyword(e.target.value);
	};
	return (
		<InputGroup className={styles.input + ` mb-3`}>
			<InputGroup.Text
				className="rounded-start border-0 bg-white"
				style={{ zIndex: 10 }}
			>
				<Icon icon="bi:search" width="15" color="#8f8d8d" />
			</InputGroup.Text>
			<FormControl
				placeholder="Cari lokasi / nama musisi"
				className="border-0"
				value={keyword}
				name="keyword"
				onChange={onChange}
			/>
			<Button variant="primary">Cari</Button>
		</InputGroup>
		// <div className={`bg-white ps-2 rounded ${styles.searchbar}`}>
		// 	<Icon icon="ant-design:keyword-outlined" color="#8f8d8d" />
		// 	<input
		// 		className={`${styles.input} ps-2 text-truncate`}
		// value={keyword}
		// name="keyword"
		// 		placeholder="Cari lokasi / nama musisi"
		// 		onChange={onChange}
		// 	/>
		// 	<button
		// 		className={`border-0 text-white ${styles.button} rounded-end p-2 px-4`}
		// 		onClick={onClick}
		// 	>
		// 		Cari
		// 	</button>
		// </div>
	);
}
