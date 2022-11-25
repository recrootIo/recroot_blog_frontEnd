import React, { useState } from "react";
import "./index.css";
import Navbar from "../../components/Navbar/Navbar";
import { Button, Stack, TextField } from "@mui/material";
import useCategory from "../../Hooks/useCategory";
import { useDispatch } from "react-redux";
import { openModal } from "../../store/messagesSlice";
import { ERROR, SUCCESS } from "../../components/constants";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../router/Routes";

const CreateCategory = () => {
  const { createCategories } = useCategory();
  const [cate, setCate] = useState("");
  const dispatch = useDispatch();
  const navigation = useNavigate();

  /**
   * handler to create new Category
   */
  const saveCategory = () => {
    createCategories(cate)
      .then((res) => {
        dispatch(
          openModal({ type: SUCCESS, message: "New Category is created !" })
        );
        handleNavigate();
      })
      .catch((res) =>
        openModal({ type: ERROR, message: "Somthing went wrong" })
      );
  };

  /**
   * Action navigate to Home page
   */
  const handleNavigate = () => {
    navigation(`${ROUTES.BLOGS}`);
  };

  return (
    <div className="blog-portal-wrapper">
      <Navbar />
      <div className="blog-portal">
        <h2 className="blog-portal-head">Create Category </h2>
        <div className="blog-portal">
          <Stack spacing={3} justifyContent="space-between">
            <TextField
              size="large"
              placeholder="Type your Category here..."
              onChange={(e) => setCate(() => e.target.value)}
            />
          </Stack>
        </div>
        <Stack
          direction={"row"}
          justifyContent="center"
          spacing={3}
          sx={{ mt: "20px" }}
        >
          <Button
            variant="contained"
            sx={{ color: "white" }}
            onClick={() => saveCategory()}
          >
            Create
          </Button>
          <Button
            variant="outlined"
            color="warning"
            onClick={() => handleNavigate()}
          >
            Discard
          </Button>
        </Stack>
      </div>
    </div>
  );
};

export default CreateCategory;
