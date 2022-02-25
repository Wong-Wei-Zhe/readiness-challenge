import { Box, Button, TextField } from "@mui/material";
import React, { useState } from "react";
import { ArrowBackSharp, LockResetOutlined } from "@mui/icons-material";
import { width } from "@mui/system";

const ForgotPswd = () => {
  const [email, setEmail] = useState("");
  const handleSubmit = () => {};
  return (
    <>
      <Box
        p={3}
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Box
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            background: "#F3F8FF",
            borderRadius: "50%",
            width: "60px",
            height: "60px",
          }}
        >
          <Box
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              background: "#DEECFF",
              borderRadius: "50%",
              width: "50px",
              height: "50px",
            }}
          >
            <LockResetOutlined fontSize="large" style={{ color: "#051367" }} />
          </Box>
        </Box>
        <h2>Forgot password?</h2>
        <span style={{ color: "#6a6a6a" }}>
          We will send you instructions to reset your password
        </span>
        <Box width={400} p={3}>
          <TextField
            required
            id="outlined-required"
            label="Email"
            placeholder="Enter your email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
          />
        </Box>
        <Box width={400}>
          <Button
            variant="contained"
            size="large"
            style={{ backgroundColor: "#0d47a1", fontWeight: "bold" }}
            onClick={handleSubmit}
            href="/checkemail"
            fullWidth
          >
            Reset Password
          </Button>
        </Box>
        <Box p={3}>
          <Button
            variant="text"
            href="/"
            startIcon={<ArrowBackSharp />}
            style={{
              color: "#999",
            }}
          >
            Back to Home
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default ForgotPswd;