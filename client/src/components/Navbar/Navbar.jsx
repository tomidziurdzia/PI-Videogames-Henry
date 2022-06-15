import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import SearchBar from "../SearchBar/SearchBar";
import styles from "./Navbar.module.css";
import { setPage } from "../../redux/actions";

const Navbar = () => {
  const dispatch = useDispatch();

  const handleFirstPage = () => {
    dispatch(setPage(1));
  };

  return (
    <div className={styles.background}>
      <Link className={styles.titleLink} to="/home" onClick={handleFirstPage}>
        <h1 className={styles.title}>Videogames</h1>
      </Link>
      <SearchBar className={styles.searchBar} />
    </div>
  );
};

export default Navbar;
