import {request} from '../utils/request.ts';

export async function getConfigRequest(name: string, type: string): Promise<any> {
	const response = await request().get('/config', { params: { name, type } });
	return response.data;
}