import axios from "axios";

const useBlogs = () => {
  /**
   * Request to save form-data
   * @param {*} data title,category,image,tags
   * @returns
   */
  const createBlogs = async (data) => {
    const { title, description, tags, blogImage, category } = data;

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("tags", tags);
    formData.append("blogs", blogImage);
    formData.append("category", category);

    return await axios.post(`addBlogs`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        "Cache-Control": "no-cache",
      },
    });
  };

  /**
   * Request to delete blog
   * @param {*} id
   */
  const deleteBlogs = async (id) => {
    return await axios.delete(`deleteBlogByid/${id}`);
  };

  /**
   * Reaquest to get single blog using id
   * @param {*} id
   */
  const getBlog = async (id) => {
    return await axios.get(`getBlog/${id}`);
  };

  /**
   * Reaquest to get single blog using id
   * @param {*} id
   */
  const updateBlog = async (id, data) => {
    const { title, description, tags, blogImage, blogs, category } = data;

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("tags", tags);
    formData.append("blogImage", blogImage);
    formData.append("blogs", blogs);
    formData.append("category", category);

    return await axios.put(`editBlogs/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  };

  return { createBlogs, deleteBlogs, getBlog, updateBlog };
};

export default useBlogs;
