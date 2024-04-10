// mui
import { Stack, TextField } from "@mui/material";
import { styled } from "@mui/system";
import { Theme } from "@mui/material";
import { SystemProps } from "@mui/system";

const StyledMainInput = styled(Stack)<SystemProps<Theme>>(({ theme }) => ({
  "& .MuiOutlinedInput-root": {
    color: `${theme.palette.grey[100]} !important`,

    borderRadius: "8px",
    overflow: "hidden",

    "& .MuiOutlinedInput-input": {
      textAlign: "left ",
    },

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

  //inner label
  "& label": {
    fontSize: "16px",
    color: `${theme.palette.grey[500]} !important`,
  },
}));

const mainInputStyles = {
  StyledMainInput,
};

export default mainInputStyles;
