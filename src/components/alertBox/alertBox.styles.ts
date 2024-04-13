import { Box, Dialog, styled } from "@mui/material";

export const StyledAlertBox = styled(Dialog)(({ theme }) => ({
  "& .MuiPaper-root": {
    backgroundColor: "#202a35",
    color: "#fff",
  },
}));
