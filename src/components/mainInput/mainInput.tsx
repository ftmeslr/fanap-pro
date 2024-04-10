import { FC } from "react";

import { Stack, TextField, TextFieldProps } from "@mui/material";

import styles from "./mainInput.styles";

const MainInput: FC<TextFieldProps> = ({ label, ...params }) => {
  const { StyledMainInput } = styles;
  return (
    <StyledMainInput>
      <TextField fullWidth label={label || null} {...params} />
    </StyledMainInput>
  );
};

export default MainInput;
