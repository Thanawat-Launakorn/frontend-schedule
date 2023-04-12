import axios from "axios";
export const BASE_URL_USER = `http://192.168.2.62:3001/user`;
export const BASE_URL_SCHEDULE = `http://192.168.2.62:3001/schedule`;
export const BASE_URL_LINE = `http://192.168.2.62:3001/`;
export const BASE_URL_EMAIL = `http://192.168.2.62:3001/notiemail`;

export async function Get<IModel>(URL: string) {
  return await axios.get<Array<IModel>>(`${URL}/get`);
}

export async function Random<IModel>(URL: string) {
  return await axios.get<Array<IModel>>(`${URL}/random`);
}

export async function Post<IModel>(params?: IModel, URL?: string) {
  if (params) {
    return await axios.post<IModel>(`${URL}/create`, params);
  }
}

export async function GetId<IModel>(id?: number | string, URL?: string) {
  if (id) {
    return await axios.get<IModel>(`${URL}/find/${id}`);
  }
}

export async function Update<IModel>(
  id?: number,
  params?: IModel,
  URL?: string
) {
  if (id && params) {
    return await axios.patch<IModel>(`${URL}/update/${id}`, params);
  }
}

export async function Delete<IModel>(id?: number, URL?: string) {
  if (id) {
    return await axios.delete<IModel>(`${URL}/delete/${id}`);
  }
}
