import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Chip,
  Collapse,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import ReactQuill from "react-quill";

const BlogCard = ({ ...props }) => {
  const navigation = useNavigate();
  const { title, _id, description, blogImage, tags, category, deleteBlog } =
    props;

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleNavigate = () => {
    navigation(`/blogs/${_id}`);
  };

  const handleNavigateEdit = () => {
    navigation(`/blogs/edit/${_id}`);
  };

  const removeBlog = (id) => {
    deleteBlog(id);
    handleClose();
  };

  return (
    <Card variant="outlined" sx={{ width: "325px" }}>
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
              <MenuItem onClick={() => removeBlog(_id)}>
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
        image={`${process.env.REACT_APP_URL}/api/getCompanyPhotos?compPhotos=${blogImage}`}
        alt="Paella dish"
      />
      <CardContent>
        <Stack spacing={3}>
          <Stack direction={"row"} justifyContent={"space-between"}>
            <Typography variant="h6">{title}</Typography>
            <Typography variant="body2">{category}</Typography>
          </Stack>
          <Stack direction={"row"} spacing={1}>
            {tags[0]?.split(",").map((tag) => (
              <Chip label={`#${tag}`} key={tag} />
            ))}
          </Stack>
          <Collapse collapsedSize={100}>
            <ReactQuill value={description} readOnly={true} theme={"bubble"} />
          </Collapse>
        </Stack>
      </CardContent>
    </Card>
  );
};

BlogCard.defaultProps = {
  _id: "",
  title: "",
  category: "",
  tags: [],
  blogImage: "",
  deleteBlog: () => {},
};

BlogCard.propTypes = {
  _id: PropTypes.string,
  title: PropTypes.string,
  category: PropTypes.string,
  tags: PropTypes.array,
  blogImage: PropTypes.string,
  deleteBlog: PropTypes.func,
};

export default BlogCard;
