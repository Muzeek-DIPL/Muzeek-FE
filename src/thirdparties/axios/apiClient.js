import axios from 'axios';

const apiClient = axios.create({
	baseURL: import.meta.env.VITE_BE_API_URL,
});

// add header before sending request
apiClient.interceptors.request.use(
	(config) => {
		config.headers['Accept'] = 'application/json';
		config.headers['Content-Type'] = 'application/json';
		return config;
	},
	(error) => {
		Promise.reject(error);
	}
);

// timeout
apiClient.defaults.timeout = 5000;

// redirect when cookies expired
apiClient.interceptors.response.use(
	function (response) {
		return response;
	},
	function (error) {
		return Promise.reject(error);
	}
);

export { apiClient };
