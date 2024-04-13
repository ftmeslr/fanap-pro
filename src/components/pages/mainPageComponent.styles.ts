import { Box, Stack, styled } from "@mui/material";
import { Theme } from "@mui/material";
import { SystemProps } from "@mui/system";

export const MenuBoxStyled = styled(Box)(({ theme }) => ({
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

export const ManinPageBoxStyled = styled(Box)(({ theme }) => ({
  background: "#151b25",
  height: "100vh",
  padding: "5% 10%",
}));

export const MainInputStyled = styled(Stack)<SystemProps<Theme>>(
  ({ theme }) => ({
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
  })
);
