import { Link } from 'react-router-dom';

export default function NotFound(props) {
	const { code, message } = props;
	return (
		<div className="container text-center m-auto align-self-center position-absolute top-50 start-50 translate-middle">
			<p className="mb-1 fs-2">
				<span className="fw-bold fs-1">{code} </span>| {message}.
			</p>
			<Link className="text-decoration-none" style={{ color: '#f2af02' }} to="/">
				Return home
			</Link>
		</div>
	);
}
