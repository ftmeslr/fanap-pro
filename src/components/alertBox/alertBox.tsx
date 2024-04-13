import { useState, ChangeEvent } from "react";
import type { FC } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
} from "@mui/material";
import { StyledAlertBox } from "./alertBox.styles";
import { MainInputStyled } from "../pages/mainPageComponent.styles";

interface Props {
  title: string;
  open: boolean;
  itemId: string;
  handleClose: () => void;
  handleAction: () => void;
}

const AlertBox: FC<Props> = ({
  title,
  open,
  itemId,
  handleClose,
  handleAction,
}: Props) => {
  const [confirmationText, setConfirmationText] = useState<string>("");

  const changeConfirmationText = (e: ChangeEvent<HTMLInputElement>): void => {
    setConfirmationText(e.target.value);
  };

  const confirmAction = (): void => {
    if (confirmationText === "تایید") {
      handleAction();
    }
  };

  const clearConfirmationText = (): void => {
    setConfirmationText("");
  };

  const onCloseClick = (): void => {
    clearConfirmationText();
    handleClose();
  };

  return (
    <StyledAlertBox open={open} onClose={onCloseClick}>
      <DialogTitle variant="subtitle1">{title}</DialogTitle>
      <DialogContent className="dialog-content">
        <Typography mb={2} variant="subtitle2" className="dialog-content">
          {`لطفا تایید را بنویسید ${itemId} برای حذف مسیر ارتباطی`}
        </Typography>
        <MainInputStyled>
          <TextField
            fullWidth
            label="تایید"
            value={confirmationText}
            onChange={changeConfirmationText}
          />
        </MainInputStyled>{" "}
      </DialogContent>
      <DialogActions>
        <Button onClick={onCloseClick} variant="text">
          انصراف
        </Button>
        <Button
          color="error"
          disabled={confirmationText !== "تایید"}
          onClick={confirmAction}
          variant="text"
        >
          حذف
        </Button>
      </DialogActions>
    </StyledAlertBox>
  );
};

export default AlertBox;
