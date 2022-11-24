import "./index.css";
import Navbar from "../../components/Navbar/Navbar";
import { ROUTES } from "../../router/Routes";
import {
  Button,
  Chip,
  CircularProgress,
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
import { useNavigate, useParams } from "react-router-dom";
import { isEmpty } from "lodash";
import { Box } from "@mui/material";

const drop = {
  textAlign: "center",
  padding: "50px",
  border: "2px dashed #4F9AFF",
  backgroundColor: "#EFF6FF",
  color: "#afafaf",
  borderRadius: "8px",
};

const EditBlog = () => {
  const [blog, setBlog] = useState({});
  const [categories, setCategories] = useState([]);
  const [selectedCate, setSelectedCate] = useState(null);
  const [manualTag, setManualTag] = useState("");
  const [imageFile, setImageFile] = useState("");
  const [loading, setLoading] = useState(false);

  const { getBlog, updateBlog } = useBlogs();
  const { getAllCategories } = useCategory();
  const navigation = useNavigate();
  const { id } = useParams();

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/jpeg": [],
      "image/png": [],
    },
    onDrop: (acceptedFiles) => {
      setImageFile(() => acceptedFiles[0]);
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
   * Action to Select Categories
   * @param {*} e
   */
  const handleChange = (e) => {
    console.log(e.target.value);
    setSelectedCate();
  };

  /**
   * Action to Add tags to tags list
   */
  const addTags = () => {
    if (manualTag) {
      setBlog((state) => ({
        ...state,
        tags: [...state.tags, manualTag],
      }));
      setManualTag("");
    }
  };

  /**
   * Action navigate to Home page
   */
  const handleNavigate = () => {
    navigation(`${ROUTES.BLOGS}`);
  };

  /**
   *
   */
  const getBlogging = () => {
    setLoading(true);
    getBlog(id).then((res) => {
      setBlog(() => res.data[0]);
      setLoading(false);
    });
  };

  useEffect(() => {
    if (isEmpty(blog)) {
      getBlogging();
    }
  }, []);

  const setDescription = (e) => {
    setBlog((state) => ({
      ...state,
      description: e,
    }));
  };

  const imageUrl = blog?.blogImage
    ? `${process.env.REACT_APP_URL}/api/getCompanyPhotos?compPhotos=${blog?.blogImage}`
    : imageFile
    ? URL.createObjectURL(imageFile)
    : null;

  const updateBlogs = () => {
    const newBlog = {
      ...blog,
      blogImage: blog?.blogImage,
      blogs: imageFile,
    };

    updateBlog(id, newBlog)
      .then((res) => handleNavigate())
      .catch((error) => console.log(error));
  };

  return (
    <div className="blog-portal-wrapper">
      <Navbar />
      <div className="blog-portal">
        <h2 className="blog-portal-head">Update Blog</h2>
        <Stack spacing={3} justifyContent="space-between">
          <TextField
            size="large"
            placeholder="Type your title here..."
            onChange={(e) =>
              setBlog((state) => ({ ...state, title: e.target.value }))
            }
            value={blog?.title}
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
                value={selectedCate?.category || blog?.category}
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
                {blog?.tags?.map((tag) => (
                  <Chip label={`#${tag}`} />
                ))}
              </Stack>
            </Stack>
          </Stack>
          <div>
            <section className="container">
              {imageUrl ? (
                <img src={imageUrl} alt="" />
              ) : (
                <div {...getRootProps({ className: "dropzone" })} style={drop}>
                  <input {...getInputProps()} />

                  <p color="primary">
                    Drag and drop or <span color="primary">Browse</span>
                  </p>
                </div>
              )}
              {imageUrl && (
                <Button
                  onClick={() => {
                    setBlog((state) => ({
                      ...state,
                      blogImage: "",
                    }));
                    setImageFile(() => "");
                  }}
                >
                  Remove
                </Button>
              )}
            </section>
          </div>
          <FormControl>
            <EditorToolbar />
            <ReactQuill
              theme="snow"
              value={blog?.description}
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
          {loading ? (
            <>
              <Box sx={{ display: "flex" }}>
                <CircularProgress />
              </Box>
            </>
          ) : (
            <>
              <Button
                variant="contained"
                sx={{ color: "white" }}
                onClick={() => updateBlogs()}
              >
                Update
              </Button>
              <Button variant="outlined" color="warning">
                Discard
              </Button>
            </>
          )}
        </Stack>

        {/* <Alerts open={success} handleClose={() => setSuccess(!success)} /> */}
      </div>
    </div>
  );
};

export default EditBlog;
