import "./index.css";
import Navbar from "../../components/Navbar/Navbar";
import SearchIcon from "@mui/icons-material/Search";

const Search = () => {
  return (
    <div className="SearchWrapper">
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
    </div>
  );
};

export default Search;
