import React from "react";
import { BrowserRouter, Route, Routes as Switch } from "react-router-dom";
import Login from "../pages/Home/Login";
import Signup from "../pages/Home/Signup";
import Blogs from "../pages/Blogs/Blogs";
import CreateBlog from "../pages/CreateBlogs/CreateBlog";
import Blog from "../pages/Blog/Blog";
import EditBlog from "../pages/EditBlog/EditBlog";
import CreateCategory from "../pages/Category/CreateCategory";
import Error404 from "../pages/NotFound/Error404";
import VerifyRoute from "./VerifyRoute";

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
          <Route
            exact
            path={ROUTES.BLOGS}
            element={
              <VerifyRoute>
                <Blogs />
              </VerifyRoute>
            }
          />
          {/* Blog-Create */}
          <Route
            exact
            path={ROUTES.CREATE_BLOG}
            element={
              <VerifyRoute>
                <CreateBlog />
              </VerifyRoute>
            }
          />
          {/* Blog-Read */}
          <Route
            exact
            path={ROUTES.BLOG}
            element={
              <VerifyRoute>
                {" "}
                <Blog />
              </VerifyRoute>
            }
          />
          {/* Blog-Edit */}
          <Route
            exact
            path={ROUTES.EDIT_BLOG}
            element={
              <VerifyRoute>
                <EditBlog />
              </VerifyRoute>
            }
          />
          {/* Create-Category */}
          <Route
            exact
            path={ROUTES.CREATE_CATEGORY}
            element={
              <VerifyRoute>
                <CreateCategory />
              </VerifyRoute>
            }
          />
          {/* Page-NotFound */}
          <Route
            path="*"
            element={
              <VerifyRoute>
                <Error404 />
              </VerifyRoute>
            }
          />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default Router;
