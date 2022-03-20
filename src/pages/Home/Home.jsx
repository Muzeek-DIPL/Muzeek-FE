import Navbar from '../../components/Navbar/Navbar';
import MusicianCardHome from './MusicianCardHome';
import styles from './Home.module.css';
import SearchInputHome from './SearchInputHome';

export default function Home() {
	const mockData = [
		{
			id: 1,
			img_link:
				'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
			full_name: 'John Doe',
			instrument: 'Guitar',
		},
		{
			id: 2,
			img_link:
				'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
			full_name: 'John Doe',
			instrument: 'Guitar',
		},
		{
			id: 3,
			img_link:
				'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
			full_name: 'John Doe',
			instrument: 'Guitar',
		},
		{
			id: 4,
			img_link:
				'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
			full_name: 'John Doe',
			instrument: 'Guitar',
		},
	];
	return (
		<div className="pb-3">
			<Navbar />
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
					{mockData.map((item) => (
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
					{mockData.map((item) => (
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
