import axios from 'axios';

const baseHost = 'http://localhost:3000';
const baseURL = `${baseHost}/api/`;
export const request = () => {
	return axios.create({
		baseURL,
		headers: {
			'Content-Type': 'application/json',
			'Authorization': 'YOUR_TOKEN_HERE'
		}
	});
};
