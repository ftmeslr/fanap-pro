import { mockApi } from "../api";
import { IGetSocialsListResponse } from "./mainApi.types";

// Get getSocialsList list from API
export const getSocialsList = async (): Promise<IGetSocialsListResponse[]> => {
  const response = await mockApi.get<IGetSocialsListResponse[]>(`/socials`);

  return response.data;
};

// Get getSocialsList list from API
export const addToList = async (data: any): Promise<any> => {
  const response = await mockApi.post<any>(`/socials`, data);

  return response.data;
};

// Get getSocialsList list from API
export const deleteItemCallApi = async (id: any): Promise<any> => {
  const response = await mockApi.delete<any>(`/socials/${id}`);

  return response.data;
};

export const editListItemCallApi = async ({ id, data }: any): Promise<any> => {
  const response = await mockApi.put<any>(`/socials/${id}`, data);

  return response.data;
};
