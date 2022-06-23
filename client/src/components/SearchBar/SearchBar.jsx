import { useState } from "react";
import { useDispatch } from "react-redux";
import { searchVideogame, setLoading } from "../../redux/actions";
import styles from "./SearchBar.module.css";

const SearchBar = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState();

  const handleChange = (e) => {
    setName(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(setLoading(true));
    dispatch(searchVideogame(name));
    setName("");
  };

  return (
    <form onSubmit={handleSubmit} className={styles.searchContainer}>
      <input
        className={styles.searchBar}
        type="text"
        placeholder="Search game"
        onChange={handleChange}
      />
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="icon icon-tabler icon-tabler-search"
        width="33"
        height="33"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="#9e9e9e"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <circle cx="10" cy="10" r="7" />
        <line x1="21" y1="21" x2="15" y2="15" />
      </svg>
    </form>
  );
};

export default SearchBar;
