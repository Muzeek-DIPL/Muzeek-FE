import { apiClient } from '../thirdparties/axios/apiClient';
import { apiClientPrivate } from '../thirdparties/axios/apiClientPrivate';
import { handleLogin, handleLogout } from '../utils/helpers';

export const postLogin = (form, setSubmitting, setFetchError) => {
	setSubmitting(true);
	apiClient
		.post(`${import.meta.env.VITE_BE_API_URL}/login`, form)
		.then((response) => {
			handleLogin(response.data.data);
		})
		.catch((error) => {
			setFetchError(error.response.data.meta.message[0]);
		})
		.finally(() => {
			setSubmitting(false);
		});
};

export const postRegister = (form, setSubmitting, setFetchError) => {
	setSubmitting(true);
	apiClient
		.post(`${import.meta.env.VITE_BE_API_URL}/register`, form)
		.then((response) => {
			handleLogin(response.data.data);
		})
		.catch((error) => {
			setFetchError(error.response.data.meta.message[0]);
		})
		.finally(() => {
			setSubmitting(false);
		});
};

export const postLogout = () => {
	apiClientPrivate.post(`${import.meta.env.VITE_BE_API_URL}/logout`).then(() => {
		handleLogout();
	});
};
