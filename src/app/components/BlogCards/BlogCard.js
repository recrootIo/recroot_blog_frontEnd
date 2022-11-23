import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
} from "@mui/material";
import React from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import { useNavigate } from "react-router-dom";

const BlogCard = ({ ...props }) => {
  const navigation = useNavigate();
  const { title, id } = props;

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleNavigate = () => {
    navigation(`/blogs/${id}`);
  };

  const handleNavigateEdit = () => {
    navigation(`/blogs/${id}/edit`);
  };

  return (
    <Card variant="outlined" sx={{}}>
      <CardHeader
        action={
          <>
            <Button id="basic-button" onClick={handleClick}>
              <IconButton aria-label="settings">
                <MoreVertIcon />
              </IconButton>
            </Button>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              <MenuItem onClick={() => handleNavigate()}>
                <ListItemIcon>
                  <RemoveRedEyeIcon fontSize="small" color="primary" />
                </ListItemIcon>
                <ListItemText>View</ListItemText>
              </MenuItem>
              <MenuItem onClick={() => handleNavigateEdit()}>
                <ListItemIcon>
                  <ModeEditOutlineOutlinedIcon
                    fontSize="small"
                    color="success"
                  />
                </ListItemIcon>
                <ListItemText>Edit</ListItemText>
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <ListItemIcon>
                  <DeleteForeverOutlinedIcon fontSize="small" color="warning" />
                </ListItemIcon>
                <ListItemText>Delete</ListItemText>
              </MenuItem>
            </Menu>
          </>
        }
      />
      <CardMedia
        component="img"
        height="194"
        image="https://akm-img-a-in.tosshub.com/businesstoday/images/story/202010/jobs_660_130920052343_291020052310.jpg?size=1200:675"
        alt="Paella dish"
      />
      <CardContent>{title}</CardContent>
    </Card>
  );
};

export default BlogCard;
