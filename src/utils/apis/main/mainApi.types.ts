export interface IListItem {
  id?: string;
  type: string;
  link: string;
  social_id: string;
}

export interface IEditListItemCallApiProps {
  id: string;
  data: IListItem;
}
