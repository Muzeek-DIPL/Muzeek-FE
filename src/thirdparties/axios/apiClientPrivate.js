import axios from 'axios';
import Cookies from 'universal-cookie';
import { handleLogout } from '../../utils/helpers';

// for nest server
const apiClientPrivate = axios.create({
	baseURL: import.meta.env.VITE_BE_API_URL,
});

// add header before sending request
apiClientPrivate.interceptors.request.use(
	(config) => {
		const cookies = new Cookies();
		const token = cookies.get('token');

		config.headers['Accept'] = 'application/json';
		config.headers['Content-Type'] = 'application/json';
		config.headers['Authorization'] = 'Bearer ' + token;
		return config;
	},
	(error) => {
		Promise.reject(error);
	}
);

// timeout
apiClientPrivate.defaults.timeout = 5000;

// redirect when cookies expired
apiClientPrivate.interceptors.response.use(
	function (response) {
		return response;
	},
	function (error) {
		if (error.response.status === 401 || error.response.status === 403) {
			handleLogout();
		}
		console.log(
			'Looks like there was a problem. Status Code: ',
			error.response.status
		);
		return Promise.reject(error);
	}
);

export { apiClientPrivate };
