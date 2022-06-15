import { Link } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar";
import styles from "./Navbar.module.css";

const Navbar = () => {
  return (
    <div className={styles.background}>
      <Link className={styles.titleLink} to="/home">
        <h1 className={styles.title}>Videogames</h1>
      </Link>
      <SearchBar className={styles.searchBar} />
    </div>
  );
};

export default Navbar;
