import { Box, styled } from "@mui/material";

export const StyledMenuBox = styled(Box)(({ theme }) => ({
  "label.MuiInputLabel-shrink": {
    color: `${theme.palette.grey[100]} !important`,
    top: "1px",
  },

  ".MuiOutlinedInput-root": {
    color: theme.palette.common.white,
    "&:hover": {
      "& fieldset": {
        borderColor: theme.palette.grey[500], // change the border color here ,
      },
    },

    "& fieldset": {
      borderColor: theme.palette.grey[500], // change the border color here ,
    },

    "&.Mui-focused": {
      "& fieldset": {
        borderColor: theme.palette.primary.main, // change the border color here ,
      },
    },
  },
  ".MuiOutlinedInput-notchedOutline": {
    borderColor: theme.palette.grey[500],
    borderRadius: "8px",
  },
  //inner label
  "& label": {
    fontSize: "16px",
    color: `${theme.palette.grey[500]} !important`,
  },
}));
