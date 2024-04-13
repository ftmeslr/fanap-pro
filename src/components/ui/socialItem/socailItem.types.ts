import { IGetSocialsListResponse } from "../../../utils/apis/main/mainApi.types";
import { SocialMediaListType } from "../../pages/mainPageComponent.types";

export interface ISocialItemProps {
  item: IGetSocialsListResponse;
  editItem: (item: SocialMediaListType) => void;
  deleteButtonClick: (id: string) => void;
}
