import {
  Button,
  FormControl,
  FormLabel,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import Layout from "./Layout";
import "./index.css";

const Signup = () => {
  const [user, setUser] = useState({
    name: "",
    password: "",
  });

  const onChange = (e) => {
    const { value, id } = e.target;
    setUser((state) => ({
      ...state,
      [id]: value,
    }));
  };

  return (
    <Layout>
      <div className="portal-login">
        <div className="portal">
          <h2 className="portal-head">Login</h2>
          <Stack spacing={3} alignItems={"center"}>
            <FormControl fullWidth>
              <FormLabel>Name</FormLabel>
              <TextField
                variant="outlined"
                size="small"
                value={user.name}
                onChange={onChange}
              />
            </FormControl>

            <FormControl fullWidth>
              <FormLabel>Email</FormLabel>
              <TextField
                hiddenLabel
                variant="outlined"
                size="small"
                value={user.password}
                onChange={onChange}
              />
            </FormControl>

            <FormControl fullWidth>
              <FormLabel>Password</FormLabel>
              <TextField
                variant="outlined"
                size="small"
                value={user.name}
                onChange={onChange}
              />
            </FormControl>

            <FormControl fullWidth>
              <FormLabel>Confirm Password</FormLabel>
              <TextField
                hiddenLabel
                variant="outlined"
                size="small"
                value={user.password}
                onChange={onChange}
              />
            </FormControl>
            <Button>Signup</Button>
            <Typography variant="subtitle2">
              Already hace an account?
            </Typography>
          </Stack>
        </div>
      </div>
    </Layout>
  );
};

export default Signup;
