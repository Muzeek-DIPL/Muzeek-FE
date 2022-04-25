import { Icon } from '@iconify/react';
import { Formik } from 'formik';
import { useState } from 'react';
import { Button, FloatingLabel, Form, Modal, Spinner } from 'react-bootstrap';
import { postRegister } from '../../network/post';
import { validateForm } from '../../utils/helpers';

export default function JoinModal(props) {
	const [fetchError, setFetchError] = useState('');
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
				<h2 className="fw-bolder text-center">Join to Muzeek</h2>
				<Formik
					initialValues={{
						username: '',
						email: '',
						password: '',
						full_name: '',
						phone: '',
					}}
					validate={(values) => {
						setFetchError('');
						return validateForm(values);
					}}
					onSubmit={(values, { setSubmitting }) => {
						postRegister(values, setSubmitting, setFetchError);
					}}
				>
					{({
						values,
						errors,
						touched,
						handleChange,
						handleBlur,
						handleSubmit,
						isSubmitting,
					}) => (
						<Form className="px-4 px-md-5 py-3" onSubmit={handleSubmit}>
							<p className="text-danger text-center">{fetchError}</p>

							<FloatingLabel label="Username" className="mb-3">
								<Form.Control
									value={values.username}
									name="username"
									placeholder="Username"
									onChange={handleChange}
									onBlur={handleBlur}
									isInvalid={!!errors.username}
									type="text"
								/>
								<Form.Control.Feedback type="invalid">
									{errors.username && touched.username && errors.username}
								</Form.Control.Feedback>
							</FloatingLabel>

							<FloatingLabel label="Email" className="mb-3">
								<Form.Control
									value={values.email}
									name="email"
									placeholder="Email"
									onChange={handleChange}
									onBlur={handleBlur}
									isInvalid={!!errors.email}
									type="email"
								/>
								<Form.Control.Feedback type="invalid">
									{errors.email && touched.email && errors.email}
								</Form.Control.Feedback>
							</FloatingLabel>

							<FloatingLabel label="Password" className="mb-3">
								<Form.Control
									value={values.password}
									name="password"
									placeholder="Password"
									onChange={handleChange}
									onBlur={handleBlur}
									type="password"
									isInvalid={!!errors.password}
								/>
								<Form.Control.Feedback type="invalid">
									{errors.password && touched.password && errors.password}
								</Form.Control.Feedback>
							</FloatingLabel>

							<FloatingLabel label="Nama Lengkap" className="mb-3">
								<Form.Control
									value={values.full_name}
									name="full_name"
									placeholder="Nama Lengkap"
									onChange={handleChange}
									onBlur={handleBlur}
									isInvalid={!!errors.full_name}
									type="text"
								/>
								<Form.Control.Feedback type="invalid">
									{errors.full_name && touched.full_name && errors.full_name}
								</Form.Control.Feedback>
							</FloatingLabel>

							<FloatingLabel label="No. Handphone" className="mb-3">
								<Form.Control
									value={values.phone}
									name="phone"
									placeholder="No. Handphone"
									onChange={handleChange}
									onBlur={handleBlur}
									isInvalid={!!errors.phone}
									type="text"
								/>
								<Form.Control.Feedback type="invalid">
									{errors.phone && touched.phone && errors.phone}
								</Form.Control.Feedback>
							</FloatingLabel>

							<Button
								variant="primary"
								className="rounded p-2 w-100"
								type="submit"
								disabled={isSubmitting}
							>
								{isSubmitting ? (
									<Spinner
										variant="light"
										animation="border"
										size="sm"
										aria-hidden="true"
									/>
								) : (
									'Join'
								)}
							</Button>
						</Form>
					)}
				</Formik>
			</Modal.Body>
			<Modal.Footer>
				<p className="m-auto my-2">
					Sudah memiliki akun?
					<span
						onClick={props.onOpenLogin}
						className="text-primary ms-1"
						style={{ cursor: 'pointer' }}
					>
						Login
					</span>
				</p>
			</Modal.Footer>
		</Modal>
	);
}
