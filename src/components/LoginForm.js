import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { TextField, Button, Box, Alert } from "@mui/material";
import GoogleButton from "react-google-button";
import { useUserAuth } from "../context/UserAuthContext";

const validationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password is required"),
});
const styles = {
  header: {
    width: '400px',
    padding: '0 10px 0px 20px',
    
  },
  buttons: {
    margin: '10px 10px 10px 20px',
    width:'400px',
  
    
  },
  
};
const LoginForm = () => {
  const { logIn, googleSignIn } = useUserAuth();
  const navigate = useNavigate();

  const handleGoogleSignIn = async () => {
    try {
      await googleSignIn();
      navigate("/home");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="p-4 box" >
      <h2 variant="h2" className="mb-3" style={styles.header}>
      LogIn Page
    </h2>
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting, setFieldError }) => {
          try {
            await logIn(values.email, values.password);
            navigate("/home");
          } catch (error) {
            setFieldError("password", error.message);
          }
          setSubmitting(false);
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <Box marginBottom={2}
             sx={{ width: "400px", 
             padding : "0 20px 0 20px"}} >
              <Field
                as={TextField}
                type="email"
                name="email"
                label="Email address"
                variant="outlined"
                fullWidth
              />
            </Box>
            <Box marginBottom={2}
            sx={{ width: "400px", 
            padding : "0 20px 0 20px"}} >
              <Field
                as={TextField}
                type="password"
                name="password"
                label="Password"
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
              Log In
            </Button>
          </Form>
        )}
      </Formik>
      <hr />
      <div   style={{ width: '400px', margin:'0 0 0 20px' }}>
        <GoogleButton className="g-btn" type="dark" onClick={handleGoogleSignIn} />
      </div>
      <div className="p-4 box mt-3 text-center"  style={styles.buttons}>
        Don't have an account? <Link to="/Signup">Sign up</Link>
      </div>
    </div>
  );
};

export default LoginForm;
