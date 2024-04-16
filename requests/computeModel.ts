import {request} from '../utils/request.ts';

export async function computeModel(data: any, model: string): Promise<any> {
	const response = await request().post(`/${model}`, data);
	return response.data;
}