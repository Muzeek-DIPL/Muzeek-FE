import { Icon } from '@iconify/react';
import { useState } from 'react';
import { Button, FloatingLabel, Form, Modal } from 'react-bootstrap';

export default function LoginModal(props) {
	const [form, setForm] = useState({
		username: '',
		password: '',
	});
	const [errorMsg, setErrorMsg] = useState('');
	const onChange = (e) => {
		const name = e.target.name;
		const value = e.target.value;
		setForm({ ...form, [name]: value });
	};
	return (
		<Modal
			{...props}
			size="md"
			aria-labelledby="contained-modal-title-vcenter"
			centered
		>
			<Modal.Header className="border-0">
				<div
					className="ms-auto"
					style={{ cursor: 'pointer' }}
					onClick={props.onHide}
				>
					<Icon icon="carbon:close-outline" color="#f2af02" width="22" height="22" />
				</div>
			</Modal.Header>
			<Modal.Body>
				<h2 className="fw-bolder text-center">Login to Muzeek</h2>
				<Form className="px-4 px-md-5 py-3" onSubmit={() => {}}>
					<FloatingLabel label="Username" className="mb-3">
						<Form.Control
							className="mb-4"
							value={form.username}
							name="username"
							placeholder="Username"
							onChange={onChange}
							type="text"
						/>
					</FloatingLabel>
					<FloatingLabel label="Password" className="mb-3">
						<Form.Control
							className="mb-4"
							value={form.password}
							name="Password"
							placeholder="Password"
							onChange={onChange}
							type="password"
						/>
					</FloatingLabel>
					<Button variant="primary" className="rounded p-2 w-100" type="submit">
						Login
					</Button>
				</Form>
			</Modal.Body>
			<Modal.Footer>
				<p className="m-auto my-2">
					Belum memiliki akun?
					<span
						onClick={props.onOpenJoin}
						className="text-primary ms-1"
						style={{ cursor: 'pointer' }}
					>
						Join sekarang
					</span>
				</p>
			</Modal.Footer>
		</Modal>
	);
}
