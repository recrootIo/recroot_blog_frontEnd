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
import axios from "axios";
import { Routes, useNavigate } from "react-router-dom";
import { ROUTES } from "../../router/Routes";

const Login = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
let navigate = useNavigate;
  const onChange = (e) => {
    const { value, name } = e.target;
    setUser((state) => ({
      ...state,
      [name]: value,
    }));
  };

  const Login = () =>{
    axios.post('http://localhost:3000/bloglogin', user)
    .then(function (response) {
      if (response.data.token) {
        localStorage.setItem("User", JSON.stringify(response.data));
      }
      navigate(ROUTES.BLOG,{replace:true})
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  return (
    <Layout>
      <div className="portal-login">
        <div className="portal">
          <h2 className="portal-head">Login</h2>
          <Stack spacing={3} alignItems={"center"}>
            <FormControl fullWidth>
              <FormLabel>Email</FormLabel>
              <TextField
                variant="outlined"
                size="small"
                name="email"
                value={user.name}
                onChange={onChange}
              />
            </FormControl>
            <FormControl fullWidth>
              <FormLabel>Password</FormLabel>
              <TextField
                hiddenLabel
                variant="outlined"
                size="small"
                name="password"
                value={user.password}
                onChange={onChange}
              />
            </FormControl>
            <Button onClick={Login}>Login</Button>
            <Typography variant="subtitle2">Create an account?</Typography>
          </Stack>
        </div>
      </div>
    </Layout>
  );
};

export default Login;
