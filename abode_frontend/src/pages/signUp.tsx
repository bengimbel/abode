import React, { useState } from "react";
import { Box, Button, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";
import AuthForm from "../components/authForm";
import { signup } from "../api/auth";
import { Form } from "../types";

export default function SignUp() {
  const navigate = useNavigate();
  const [signUpForm, setSignUpForm] = useState<Form>({
    email: "",
    password: "",
  });

  const onFormChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setSignUpForm({
      ...signUpForm,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (
    e: React.MouseEvent<HTMLElement>
  ): Promise<void> => {
    e.preventDefault();
    try {
      await signup(signUpForm);
      navigate("/signin");
    } catch (e) {
      alert("SIGN UP FAILED");
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
          <h2>Sign Up</h2>
          <AuthForm
            email={signUpForm.email}
            password={signUpForm.password}
            onFormChange={onFormChange}
          />
          <Box sx={{ padding: "1rem 0" }}>
            <Button variant="contained" onClick={handleSubmit}>
              Sign Up
            </Button>
            <Button
              variant="outlined"
              onClick={() => navigate("/signin")}
              sx={{ margin: "0 0.5rem" }}
            >
              Sign In
            </Button>
          </Box>
        </Container>
      </Box>
    </Box>
  );
}
