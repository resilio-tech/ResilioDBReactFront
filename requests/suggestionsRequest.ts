import {request} from '../utils/request.ts';

export async function suggestionsRequest(name: string, parentKey: string): Promise<any> {
	const response = await request().get(`/suggestions?search=${name}&type=${parentKey}`);
	return response.data;
}