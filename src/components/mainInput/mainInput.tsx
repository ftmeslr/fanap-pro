import { FC } from "react";

import { Stack, TextField, TextFieldProps } from "@mui/material";

import styles from "./mainInput.styles";

const MainInput: FC<TextFieldProps> = ({ label, props }: any) => {
  const { StyledMainInput } = styles;
  return (
    <StyledMainInput>
      <TextField fullWidth label={label || null} {...props} />
    </StyledMainInput>
  );
};

export default MainInput;