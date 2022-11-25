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
import axios from "../../API/axios";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../router/Routes";
import { useDispatch } from "react-redux";
import { openModal } from "../../store/messagesSlice";
import { ERROR, SUCCESS } from "../../components/constants";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const onChange = (e) => {
    const { value, name } = e.target;
    setUser((state) => ({
      ...state,
      [name]: value,
    }));
  };

  /**
   * Action to login
   */
  const Login = () => {
    axios
      .post("/bloglogin", user)
      .then((response) => {
        if (response.data.token) {
          localStorage.setItem("User", JSON.stringify(response.data));
        }
        navigate(ROUTES.BLOGS, { replace: true });
        dispatch(
          openModal({ type: SUCCESS, message: "Logged in successfully!" })
        );
      })
      .catch(function (error) {
        dispatch(openModal({ type: ERROR, message: "Login Failed" }));
      });
  };

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
                type="password"
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
