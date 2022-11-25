import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import "./index.css";
import axios from "../../API/axios";
import { useParams } from "react-router-dom";
import { Chip, Stack, Typography } from "@mui/material";
import ReactQuill from "react-quill";
import { isEmpty } from "lodash";

const Blog = () => {
  const [blog, setBlog] = useState({});
  const { id } = useParams();

  const getBlog = () => {
    axios.get(`/getBlog/${id}`).then((res) => setBlog(res.data[0]));
  };

  useEffect(() => {
    getBlog();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="Feed ReadBlog">
      <Navbar />
      {isEmpty(blog) ? null : (
        <div className="Blogs">
          <h2 className="blog-portal-head">Read Blog</h2>
          <article className="Blog">
            <Stack spacing={4}>
              <img
                src={`${process.env.REACT_APP_URL}/api/getCompanyPhotos?compPhotos=${blog?.blogImage}`}
                alt="dp"
                width={"100%"}
                height={"50%"}
              />
              <Typography variant="h5">{blog?.title}</Typography>
              <Stack direction={"row"} spacing={2}>
                {blog?.tags.map((tag) => (
                  <Chip label={`#${tag}`} key={tag} />
                ))}
              </Stack>
              <ReactQuill
                value={blog?.description}
                readOnly={true}
                theme={"bubble"}
              />
            </Stack>
          </article>
        </div>
      )}
    </div>
  );
};

export default Blog;
