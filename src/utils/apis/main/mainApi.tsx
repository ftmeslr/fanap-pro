import { mockApi } from "../api";
import { IGetSocialsListResponse } from "./mainApi.types";

// Get getSocialsList list from API
export const getSocialsList = async (): Promise<IGetSocialsListResponse> => {
  const response = await mockApi.get<IGetSocialsListResponse>(`/socials`);

  return response.data;
};
