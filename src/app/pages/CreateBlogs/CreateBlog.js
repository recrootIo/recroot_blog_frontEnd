import "./index.css";
import Navbar from "../../components/Navbar/Navbar";
import { ROUTES } from "../../router/Routes";
import {
  Button,
  Chip,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import ReactQuill from "react-quill";
import EditorToolbar, { modules } from "../../components/Editors/EditorToolbar";
import useBlogs from "../../Hooks/useBlogs";
import useCategory from "../../Hooks/useCategory";
import Alerts from "../../components/Alerts";
import { useNavigate } from "react-router-dom";
import { isEmpty } from "lodash";

const drop = {
  textAlign: "center",
  padding: "50px",
  border: "2px dashed #4F9AFF",
  backgroundColor: "#EFF6FF",
  color: "#afafaf",
  borderRadius: "8px",
};

const CreateBlog = () => {
  const [description, setDescription] = useState("");
  const [title, setTitle] = useState("");
  const [categories, setCategories] = useState([]);
  const [selectedCate, setSelectedCate] = useState("");
  const [tags, setTags] = useState([]);
  const [manualTag, setManualTag] = useState("");
  const [success, setSuccess] = useState(false);

  const { createBlogs } = useBlogs();
  const { getAllCategories } = useCategory();
  const navigation = useNavigate();

  const { getRootProps, getInputProps, acceptedFiles } = useDropzone({
    accept: {
      "image/jpeg": [],
      "image/png": [],
    },
  });

  useEffect(() => {
    if (isEmpty(categories)) {
      getAllCategories()
        .then((res) => setCategories(() => res.data))
        .catch((error) => console.warn(error));
    }
  }, [getAllCategories, categories]);

  /**
   * Action to create a blog
   */
  const createBlog = () => {
    createBlogs({
      title,
      description,
      tags,
      blogImage: acceptedFiles[0],
      category: selectedCate?.category,
    })
      .then((res) => {
        setSuccess(true);
        handleNavigate();
      })
      .catch((res) => console.log(res));
  };

  /**
   * Action to Select Categories
   * @param {*} e
   */
  const handleChange = (e) => {
    setSelectedCate(e.target.value);
  };

  /**
   * Action to Add tags to tags list
   */
  const addTags = () => {
    if (manualTag) {
      setTags((state) => [...state, manualTag]);
      setManualTag("");
    }
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
        <h2 className="blog-portal-head">Create Blog</h2>
        <Stack spacing={3} justifyContent="space-between">
          <TextField
            size="large"
            placeholder="Type your title here..."
            onChange={(e) => setTitle(e.target.value)}
          />
          {/* Category and Tags */}
          <Stack direction={"row"} spacing={3}>
            {/* Category */}
            <FormControl fullWidth sx={{ width: "50%" }}>
              <InputLabel id="demo-simple-select-label">Category</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Category"
                onChange={handleChange}
                value={selectedCate?.category}
              >
                {categories.map((cate) => (
                  <MenuItem value={cate} key={cate?._id}>
                    {cate?.category || cate?._id}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            {/* Tags */}
            <Stack sx={{ width: "50%" }} spacing={3}>
              <Stack direction={"row"}>
                <TextField
                  fullWidth
                  size="large"
                  placeholder="Type your Tags here..."
                  onChange={(e) => setManualTag(e.target.value)}
                  value={manualTag}
                />
                <Button onClick={() => addTags()}>Add</Button>
              </Stack>
              <Stack direction={"row"} spacing={1}>
                {tags.map((tag) => (
                  <Chip label={`#${tag}`} />
                ))}
              </Stack>
            </Stack>
          </Stack>
          <div>
            <section className="container">
              {acceptedFiles[0]?.name ? (
                <img src={URL.createObjectURL(acceptedFiles[0])} alt="" />
              ) : (
                <div {...getRootProps({ className: "dropzone" })} style={drop}>
                  <input {...getInputProps()} />

                  <p color="primary">
                    Drag and drop or <span color="primary">Browse</span>
                  </p>
                </div>
              )}
            </section>
          </div>
          <FormControl>
            <EditorToolbar />
            <ReactQuill
              theme="snow"
              value={description}
              onChange={setDescription}
              modules={modules}
              placeholder="Add Description"
            />
          </FormControl>
        </Stack>

        <Stack
          direction={"row"}
          justifyContent="center"
          spacing={3}
          sx={{ mt: "20px" }}
        >
          <Button
            variant="contained"
            sx={{ color: "white" }}
            onClick={() => createBlog()}
          >
            Publish
          </Button>
          <Button variant="outlined" color="warning">
            Discard
          </Button>
        </Stack>
        <Alerts open={success} handleClose={() => setSuccess(!success)} />
      </div>
    </div>
  );
};

export default CreateBlog;
