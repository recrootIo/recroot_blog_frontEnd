export const ROUTES = {
  LOGIN: "/",
  SIGNUP: "/signup/",
  SIGNUP_SUCCESS: "/signup/success/",
  EMAIL_FAILURE: "/emailconfirmation/failure/",
  BLOGS: "/blogs",
  BLOG: "/blogs/:id",
  SEARCH: "/search",
  SETTINGS: "/settings/",
  PROFILE: (userId) => `/writer/${userId}/`,
  CREATE_BLOG: "/blogs/create",
  EDIT_BLOG: `/blogs/edit/:id`,
  CREATE_CATEGORY: "/blogs/category",
};
