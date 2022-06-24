//import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  setPage,
  setLoading,
  getVideogamesApi,
  getVideogamesDB,
  getVideogames,
  orderName,
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

  const handleOrderName = (e) => {
    e.target.value === "A-Z"
      ? dispatch(orderName(e.target.value), dispatch(setLoading(true)))
      : e.target.value === "Z-A"
      ? dispatch(orderName(e.target.value), dispatch(setLoading(true)))
      : dispatch(getVideogames(), dispatch(setLoading(true)));
  };

  return (
    <div className={styles.background}>
      <Link className={styles.titleLink} to="/" onClick={handleFirstPage}>
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
      <div>
        <select onChange={handleOrderName} name="names" id="names">
          <option value="orden">Ordenar</option>
          <option id="A-Z" value="A-Z">
            A-Z
          </option>
          <option id="Z-A" value="Z-A">
            Z-A
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
