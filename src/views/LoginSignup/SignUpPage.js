import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Box,
  Button,
  Divider,
  TextField,
  Checkbox,
  FormControlLabel,
  InputAdornment,
  IconButton,
  Avatar,
  Container,
} from "@mui/material";
import GoogleButton from "react-google-button";
import React, { useState } from "react";
import "./SignUpPage.css";
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "@firebase/auth";
import { passwordVerify } from "../../utils/PasswordChecker";
import { auth } from "../../services/firebase";

const SignUpPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);
  const handleClickShowPassword2 = () =>
    setShowConfirmPassword(!showConfirmPassword);
  const handleMouseDownPassword2 = () =>
    setShowConfirmPassword(!showConfirmPassword);

  const [errorMsg, setErrorMsg] = useState({ message: "" });

  React.useEffect(() => {
    console.log(errorMsg.message);
  }, [errorMsg]);

  const handleSubmit = async () => {
    try {
      if (password != confirmPassword) {
        throw { message: "Password Mismatch" };
      }

      if (!passwordVerify(password)) {
        throw {
          message:
            "Please ensure your password contains both Letter and Number",
        };
      }

      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      if (result.user.emailVerified === false) {
        sendEmailVerification(result.user);
      }

      console.log("Sign Up Success");
    } catch (error) {
      if (!!String(error.message).match("^Firebase:.*")) {
        setErrorMsg((previousError) => ({
          ...previousError,
          message: error.message.replace("Firebase: ", ""),
        }));
      } else {
        setErrorMsg((previousError) => ({
          ...previousError,
          message: error.message,
        }));
      }

      return;
    }
  };

  const googleProvider = new GoogleAuthProvider();
  const signInWithGoogle = () => {
    signInWithPopup(auth, googleProvider)
      .then((res) => {
        console.log("Google Provider Login Success");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Container
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100%",
        padding: "20px",
        backgroundColor: "white",
      }}
    >
      <Box
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          minWidth: "280px",
          maxWidth: "400px",
          minHeight: "400px",

          backgroundColor: "#f5f6f7",
          borderRadius: "10px",
          boxShadow: "4px 6px 0px 0px #ECECEC",
        }}
      >
        <Avatar sx={{ bgcolor: "green", height: "250px", width: "250px" }}>
          Logo
        </Avatar>
        <h1 style={{ fontSize: "20px" }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </h1>
      </Box>
      <Box
        className="loginresize"
        p={5}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          minWidth: "150px",
          maxWidth: "400px",
          maxHeight: "500px",
          backgroundColor: "#f5f6f7",
          borderRadius: "10px",
          boxShadow: "4px 6px 0px 0px #ECECEC",
        }}
      >
        <Box
          style={{
            justifyContent: "center",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            paddingBottom: "10px",
            marginTop: "-50px",
          }}
        >
          <h1>Welcome</h1>
          <h1 style={{ marginTop: "-20px" }}>Aboard</h1>
        </Box>
        <TextField
          required
          id="outlined-required"
          label="Email"
          placeholder="Enter your email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ backgroundColor: "white" }}
          fullWidth
        />
        <TextField
          required
          id="outlined-required"
          label="Password"
          placeholder="Enter your password"
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ backgroundColor: "white" }}
          fullWidth
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <TextField
          required
          id="outlined-required"
          label="Confirm Password"
          placeholder="Confirm your password"
          type={showConfirmPassword ? "text" : "password"}
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          style={{ backgroundColor: "white" }}
          fullWidth
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword2}
                  onMouseDown={handleMouseDownPassword2}
                >
                  {showConfirmPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <Button
          variant="contained"
          size="large"
          style={{
            backgroundColor: "#7BE495",
            color: "black",
            fontWeight: "bold",
          }}
          onClick={handleSubmit}
        >
          Sign Up
        </Button>
        <Divider
          style={{
            color: "#999",
            paddingBottom: 10,
            paddingTop: 10,
            fontSize: 20,
          }}
        >
          or
        </Divider>
        <Box
          style={{
            paddingRight: 50,
            paddingLeft: 50,
            paddingTop: 0,
            display: "flex",
            flexDirection: "column",
            textAlign: "center",
          }}
        >
          <Box
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <GoogleButton
              style={{ minWidth: 50, outline: "none", width: "100%" }}
              onClick={signInWithGoogle}
            />
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default SignUpPage;