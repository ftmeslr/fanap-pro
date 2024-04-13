import { ISocialItemProps } from "../../../components/ui/socialItem/socailItem.types";
import { mockApi } from "../api";
import { IEditListItemCallApiProps, IListItem } from "./mainApi.types";

// Get getSocialsList list from API
export const getSocialsList = async (): Promise<IListItem[]> => {
  const response = await mockApi.get<IListItem[]>(`/socials`);

  return response.data;
};

// add item to social list
export const addToList = async (data: IListItem): Promise<IListItem> => {
  const response = await mockApi.post<IListItem>(`/socials`, data);

  return response.data;
};

// delete Item from socialList
export const deleteItemCallApi = async (
  id: string
): Promise<{ id: string }> => {
  const response = await mockApi.delete<any>(`/socials/${",m,/,/"}`);

  return response.data;
};

// edit Item from socialList
export const editListItemCallApi = async ({
  id,
  data,
}: IEditListItemCallApiProps): Promise<any> => {
  const response = await mockApi.put<IListItem>(`/socials/${id}`, data);

  return response.data;
};
