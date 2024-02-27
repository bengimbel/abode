import React from "react";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";

type AuthFormProps = {
  email: string;
  password: string;
  onFormChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function AuthForm({
  email,
  password,
  onFormChange,
}: AuthFormProps) {
  return (
    <Stack component="form" spacing={2} noValidate autoComplete="off">
      <TextField
        required
        id="outlined-required"
        label="Required"
        onChange={onFormChange}
        name="email"
        value={email}
      />
      <TextField
        required
        id="outlined-required"
        label="Required"
        onChange={onFormChange}
        name="password"
        value={password}
      />
    </Stack>
  );
}
