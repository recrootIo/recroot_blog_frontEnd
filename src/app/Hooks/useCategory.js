import axios from "../API/axios";

const useCategory = () => {
  const getCategories = () => {
    let categories = [];
    axios.get("getBlogCategories").then((res) => {
      categories = res.data;
    });
    return categories;
  };

  const getAllCategories = async () => {
    return await axios.get("getCategoriesById/636667ec2b39cbd7cd644c86");
  };
  return { getCategories, getAllCategories };
};

export default useCategory;
