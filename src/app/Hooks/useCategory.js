import axios from "../API/axios";

const useCategory = () => {
  /**
   *
   * @returns
   */
  const getCategories = () => {
    let categories = [];
    axios.get("getBlogCategories").then((res) => {
      categories = res.data;
    });
    return categories;
  };

  /**
   * Action to Get all Categories
   * @returns
   */
  const getAllCategories = async () => {
    return await axios.get("getCategoriesById/636667ec2b39cbd7cd644c86");
  };

  /**
   *
   * @param {*} category
   * @returns
   */
  const createCategories = async (category) => {
    return await axios.post("/addBlogCategory/636667ec2b39cbd7cd644c86", {
      user: "636667ec2b39cbd7cd644c86}",
      category: category,
    });
  };

  return { getCategories, getAllCategories, createCategories };
};

export default useCategory;
