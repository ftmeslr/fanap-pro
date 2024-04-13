import { IListItem } from "../../../utils/apis/main/mainApi.types";
import { ISocialMediaList } from "../../pages/mainPageComponent.types";

export interface ISocialItemProps {
  item: IListItem;
  editItem: (item: ISocialMediaList) => void;
  deleteButtonClick: (id: string) => void;
}
