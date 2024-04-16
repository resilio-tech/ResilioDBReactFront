import { PythonModels } from '../interfaces/PythonModels';
import {request} from '../utils/request.ts';

export async function getPythonEquipmentModels(): Promise<PythonModels> {
    const response = await request().get('/models?type=hats');
    return response.data;
}

export async function getPythonModels(): Promise<PythonModels> {
    const response = await request().get('/models?type=all');
    return response.data;
}
