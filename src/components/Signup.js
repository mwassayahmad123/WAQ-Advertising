import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { TextField, Button, Box } from "@mui/material";
import { useUserAuth } from "../context/UserAuthContext";

const validationSchema = Yup.object().shape({
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  phoneNumber: Yup.string().required("Phone number is required"),
  password: Yup.string().required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required"),
});

const styles = {
  header: {
    width: '400px',
    padding: '0 10px 0px 10px',
  },
  buttons: {
    margin: '10px 10px 10px 10px',
    width: '400px',
  },
};

const Signup = () => {
  const { signUp } = useUserAuth();
  const navigate = useNavigate();

  return (
    <div className="p-4 box">
      <h2 className="mb-3" style={styles.header}>Sign Up</h2>
      <Formik
        initialValues={{
          firstName: "",
          lastName: "",
          email: "",
          phoneNumber: "",
          password: "",
          confirmPassword: "",
        }}
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting, setFieldError }) => {
          try {
            await signUp(values.email, values.password);
            navigate("/");
          } catch (error) {
            setFieldError("password", error.message);
          }
          setSubmitting(false);
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <Box marginBottom={2} style={styles.header}>
              <Field
                as={TextField}
                name="firstName"
                label="First Name"
                variant="outlined"
                fullWidth
              />
            </Box>
            <Box marginBottom={2} style={styles.header}>
              <Field
                as={TextField}
                name="lastName"
                label="Last Name"
                variant="outlined"
                fullWidth
              />
            </Box>
            <Box marginBottom={2} style={styles.header}>
              <Field
                as={TextField}
                type="email"
                name="email"
                label="Email address"
                variant="outlined"
                fullWidth
              />
            </Box>
            <Box marginBottom={2} style={styles.header}>
              <Field
                as={TextField}
                name="phoneNumber"
                label="Phone Number"
                variant="outlined"
                fullWidth
              />
            </Box>
            <Box marginBottom={2} style={styles.header}>
              <Field
                as={TextField}
                type="password"
                name="password"
                label="Password"
                variant="outlined"
                fullWidth
              />
            </Box>
            <Box marginBottom={2} style={styles.header}>
              <Field
                as={TextField}
                type="password"
                name="confirmPassword"
                label="Confirm Password"
                variant="outlined"
                fullWidth
              />
            </Box>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              disabled={isSubmitting}
              style={styles.buttons}
            >
              Sign Up
            </Button>
          </Form>
        )}
      </Formik>
      <div className="p-4 box mt-3 text-center" style={styles.buttons}>
        Already have an account? <Link to="/">Log In</Link>
      </div>
    </div>
  );
};

export default Signup;
