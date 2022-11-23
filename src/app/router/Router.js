import React from "react";
import { BrowserRouter, Route, Routes as Switch } from "react-router-dom";
import Login from "../pages/Home/Login";
import Signup from "../pages/Home/Signup";
import Blogs from "../pages/Blogs/Blogs";
import CreateBlog from "../pages/CreateBlogs/CreateBlog";
import Search from "../pages/Search/Search";
import Blog from "../pages/Blog/Blog";
import EditBlog from "../pages/EditBlog/EditBlog";
import Error404 from "../pages/NotFound/Error404";

import { ROUTES } from "./Routes";

function Router() {
  return (
    <div className="Keyblogs">
      <BrowserRouter>
        <Switch>
          {/*  Login */}
          <Route exact path={ROUTES.LOGIN} element={<Login />} />
          {/*  Signup */}
          <Route exact path={ROUTES.SIGNUP} element={<Signup />} />
          {/* Blogs-Home */}
          <Route exact path={ROUTES.BLOGS} element={<Blogs />} />
          {/* Blog-Create */}
          <Route exact path={ROUTES.CREATE_BLOG} element={<CreateBlog />} />
          {/* Blog-Read */}
          <Route exact path={ROUTES.BLOG} element={<Blog />} />
          {/* Blog-Edit */}
          <Route exact path={ROUTES.EDIT_BLOG} element={<EditBlog />} />
          {/* Page-NotFound */}
          <Route path="*" element={<Error404 />} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default Router;
