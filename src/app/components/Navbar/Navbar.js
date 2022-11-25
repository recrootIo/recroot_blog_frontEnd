import * as React from "react";
import { Link, useNavigate } from "react-router-dom";
import { ROUTES } from "../../router/Routes";
import "./index.css";
import EditIcon from "@mui/icons-material/Edit";
import HomeIcon from "@mui/icons-material/Home";
import MapsUgcIcon from "@mui/icons-material/MapsUgc";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { styled, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { openModal } from "../../store/messagesSlice";
import { SUCCESS } from "../constants";

const StyledNav = styled("nav")({
  fontSize: "13px",
});

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  /**
   * Action to Loggout
   */
  const actionLogout = () => {
    console.log("clied");
    localStorage.removeItem("User");
    dispatch(
      openModal({ title: SUCCESS, message: "Logged out successfully!" })
    );
    navigate(ROUTES.LOGIN);
  };

  return (
    <div>
      <div className={`Navbar Navbar-end`} id="Navbar">
        <Link to={ROUTES.CREATE_BLOG}>
          <StyledNav>
            <EditIcon color="primary" fontSize="medium" />
            <Typography variant="subtitle2" color="white">
              New Blog
            </Typography>
          </StyledNav>
        </Link>
        <Link to={ROUTES.BLOGS}>
          <nav>
            <HomeIcon color="primary" fontSize="medium" />
            <Typography variant="subtitle2" color="white">
              Blogs
            </Typography>
          </nav>
        </Link>
        <Link to={ROUTES.CREATE_CATEGORY}>
          <nav>
            <MapsUgcIcon color="primary" fontSize="medium" />
            <Typography variant="subtitle2" color="white">
              Category
            </Typography>
          </nav>
        </Link>
        <nav>
          <ExitToAppIcon color="primary" fontSize="medium" />
          <Typography
            variant="subtitle2"
            color="white"
            onClick={() => actionLogout()}
          >
            Logout
          </Typography>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
