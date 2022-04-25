import { useState } from 'react';
import { Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { postLogout } from '../../network/post';
import { isLoggedIn } from '../../utils/helpers';
import JoinModal from '../JoinModal/JoinModal';
import LoginModal from '../LoginModal/LoginModal';

export default function Navbar() {
	const user = useSelector((state) => state.user);

	const [openLogin, setOpenLogin] = useState(false);
	const [openJoin, setOpenJoin] = useState(false);

	const onOpenLogin = () => {
		setOpenJoin(false);
		setOpenLogin(true);
	};

	const onOpenJoin = () => {
		setOpenLogin(false);
		setOpenJoin(true);
	};

	return (
		<div>
			<nav className="navbar navbar-expand-lg navbar-light bg-white">
				<div className="container-fluid px-4">
					<Link className="navbar-brand fw-bold" style={{ color: '#F2AF02' }} to="/">
						MUZEEK
					</Link>
					<button
						className="navbar-toggler"
						type="button"
						data-bs-toggle="collapse"
						data-bs-target="#navbarNavAltMarkup"
						aria-controls="navbarNavAltMarkup"
						aria-expanded="false"
						aria-label="Toggle navigation"
					>
						<span className="navbar-toggler-icon"></span>
					</button>
					<div className="collapse navbar-collapse" id="navbarNavAltMarkup">
						<div className="navbar-nav ms-auto">
							<Link className="nav-link mx-2" to="/explore" replace>
								Explore
							</Link>
							{isLoggedIn() ? (
								<>
									<span
										className="nav-link mx-2"
										style={{ cursor: 'pointer' }}
										onClick={postLogout}
									>
										Logout
									</span>
									<Link className={`nav-link mx-2`} to={`/profile/${user.id}`}>
										<img
											className="rounded-circle"
											src={user.img_link}
											alt="user"
											style={{ width: '50px', height: '50px', objectFit: 'cover' }}
										/>
									</Link>
								</>
							) : (
								<>
									<span
										className="nav-link mx-2"
										style={{ cursor: 'pointer' }}
										onClick={() => setOpenLogin(true)}
									>
										Sign In
									</span>
									<Button
										variant="outline-primary"
										className="rounded mx-2 px-4"
										style={{ width: 'fit-content' }}
										onClick={() => setOpenJoin(true)}
									>
										Join
									</Button>
								</>
							)}
						</div>
					</div>
				</div>
			</nav>
			<LoginModal
				show={openLogin}
				onHide={() => setOpenLogin(false)}
				onOpenJoin={onOpenJoin}
			/>
			<JoinModal
				show={openJoin}
				onHide={() => setOpenJoin(false)}
				onOpenLogin={onOpenLogin}
			/>
		</div>
	);
}
