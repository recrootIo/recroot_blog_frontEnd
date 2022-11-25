import { Box, CircularProgress, Pagination, Stack } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import "./index.css";
import SearchIcon from "@mui/icons-material/Search";
import BlogCard from "../../components/BlogCards/BlogCard";
import axios from "../../API/axios";
import useBlogs from "../../Hooks/useBlogs";
import { useDispatch } from "react-redux";
import { openModal } from "../../store/messagesSlice";
import { ERROR, SUCCESS } from "../../components/constants";

const Blogs = () => {
  const { deleteBlogs } = useBlogs();
  const dispatch = useDispatch();

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");

  /**
   * Action to get all the blogs
   * @param {*} pageNumber
   */
  const getBlogs = useCallback(
    (pageNumber) => {
      setLoading(true);
      axios
        .get(`getAllBlogs?page=${pageNumber}&search=${search}`, {
          headers: {
            "Cache-Control": "no-cache",
          },
        })
        .then((res) => {
          const { currentPage, posts, totalPages } = res.data;
          setTotalPages(() => totalPages);
          setPosts(() => [...posts]);
          setPage(() => currentPage);
          setLoading(false);
        })
        .catch(() =>
          openModal({ type: ERROR, message: "Blogs could not be Loaded!" })
        );
    },
    [search]
  );

  /**
   *
   * @param {*} event
   * @param {*} value
   */
  const pageHandler = (event, value) => {
    setPage(() => value);
    getBlogs(value);
  };

  /**
   * Action to delete a blog
   * @param {*} id
   */
  const deleteBlog = (id) => {
    setLoading(true);
    deleteBlogs(id)
      .then((res) => {
        if (posts.length < 2) {
          getBlogs(1);
        } else {
          getBlogs(page);
        }
        setLoading(false);
        dispatch(
          openModal({ type: SUCCESS, message: "Blog is deleted successfuly" })
        );
      })
      .catch((res) =>
        openModal({ type: ERROR, message: "Blog could not be deleted!" })
      );
  };

  useEffect(() => {
    getBlogs(1);
  }, [getBlogs]);

  return (
    <div>
      <Navbar />
      <div className="search">
        <div className="search-input">
          <input
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Start typing to search ..."
          />
          <SearchIcon sx={{ cursor: "pointer" }} onClick={() => getBlogs(1)} />
        </div>
      </div>

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          p: "10px",
          mt: "20px",
        }}
      >
        <Stack
          sx={{
            flexDirection: { xs: "column", sm: "row" },
            gap: "20px",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          {loading ? (
            <Box sx={{ display: "flex" }}>
              <CircularProgress />
            </Box>
          ) : (
            <>
              {posts.map((d, index) => (
                <BlogCard {...d} key={index} deleteBlog={deleteBlog} />
              ))}
            </>
          )}
        </Stack>
      </Box>
      {!loading && (
        <Pagination
          count={Number(totalPages)}
          color="primary"
          page={Number(page)}
          onChange={pageHandler}
          sx={{
            justifyContent: "center",
            display: "flex",
          }}
        />
      )}
    </div>
  );
};

export default Blogs;
