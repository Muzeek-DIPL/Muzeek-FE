import mockData from '../../mockMusician.json';
import styles from './Home.module.css';
import MusicianCardHome from './MusicianCardHome';
import SearchInputHome from './SearchInputHome';

export default function Home() {
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
					{mockData.musicians.map((item) => (
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
					{mockData.musicians.map((item) => (
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
