import React, { useState } from "react";
import { Box, Button, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";
import AuthForm from "../components/authForm";
import { signin } from "../api/auth";
import { Form, Token } from "../types";
import { useAuth } from "../hooks/authProvider";

export default function SignIn() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [signInForm, setSignInForm] = useState<Form>({
    email: "",
    password: "",
  });

  const onFormChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setSignInForm({
      ...signInForm,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (
    e: React.MouseEvent<HTMLElement>
  ): Promise<void> => {
    e.preventDefault();
    try {
      const token: Token = await signin(signInForm);
      login(token);
    } catch (e) {
      alert("LOGIN FAILED");
    }
  };

  return (
    <Box
      height={"100%"}
      my={4}
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Box
        height={"100%"}
        my={4}
        display="flex"
        alignItems="center"
        justifyContent="center"
        sx={{ width: "500px" }}
      >
        <Container maxWidth="lg">
          <h2>Sign In</h2>
          <AuthForm
            email={signInForm.email}
            password={signInForm.password}
            onFormChange={onFormChange}
          />
          <Box sx={{ padding: "1rem 0" }}>
            <Button variant="contained" onClick={handleSubmit}>
              Sign In
            </Button>
            <Button
              variant="outlined"
              onClick={() => navigate("/signup")}
              sx={{ margin: "0 0.5rem" }}
            >
              Sign Up
            </Button>
          </Box>
        </Container>
      </Box>
    </Box>
  );
}
