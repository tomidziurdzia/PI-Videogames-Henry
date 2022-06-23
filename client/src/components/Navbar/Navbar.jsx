//import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  setPage,
  setLoading,
  getVideogamesApi,
  getVideogamesDB,
  getVideogames,
} from "../../redux/actions";
import styles from "./Navbar.module.css";
import SearchBar from "../SearchBar/SearchBar";

const Navbar = () => {
  const dispatch = useDispatch();

  const handleFirstPage = () => {
    dispatch(setPage(1));
  };

  const handleFilterGames = (e) => {
    if (e.target.value === "all") {
      dispatch(setLoading(true));
      dispatch(getVideogames());
    }
    if (e.target.value === "api") {
      dispatch(setLoading(true));
      dispatch(getVideogamesApi());
    }
    if (e.target.value === "db") {
      dispatch(setLoading(true));
      dispatch(getVideogamesDB());
    }
  };

  return (
    <div className={styles.background}>
      <Link className={styles.titleLink} to="/home" onClick={handleFirstPage}>
        <h1 className={styles.title}>Videogames</h1>
      </Link>
      <SearchBar className={styles.searchBar} />
      <div>
        <select onChange={handleFilterGames} name="games" id="games">
          <option id="all" value="all">
            Todos
          </option>
          <option id="db" value="db">
            Creados
          </option>
          <option id="api" value="api">
            API
          </option>
        </select>
      </div>
      <Link className={styles.newBtn} to="/new">
        New Game
      </Link>
    </div>
  );
};

export default Navbar;
