import { Box, Stack } from "@mui/material";
import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import "./index.css";
import SearchIcon from "@mui/icons-material/Search";
import BlogCard from "../../components/BlogCards/BlogCard";

const Blogs = () => {
  const data = [
    { title: "Testing 1", id: "1" },
    { title: "testing 2", id: "2" },
    { title: "testing 3", id: "3" },
    { title: "testing 4", id: "4" },
  ];
  return (
    <div>
      <Navbar />
      <div className="search">
        <div className="search-input">
          <input
            // onChange={({ target }) => this.props.searchQuery(target.value)}
            placeholder="Start typing to search ..."
          />
          <SearchIcon />
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
        <Stack sx={{ flexDirection: { xs: "column", sm: "row" }, gap: "20px" }}>
          {data.map((d, index) => (
            <BlogCard {...d} />
          ))}
        </Stack>
      </Box>
    </div>
  );
};

export default Blogs;
