export interface IAlertBoxProps {
  title: string;
  open: boolean;
  itemId: string;
  handleClose: () => void;
  handleAction: () => void;
}
