import { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setPage } from "../../redux/actions";
import styles from "./Navbar.module.css";
import CreateGame from "../CreateGame/CreateGame";
import SearchBar from "../SearchBar/SearchBar";

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
      <div>Filtros</div>
      <Link className={styles.newBtn} to="/new">
        New Game
      </Link>
    </div>
  );
};

export default Navbar;
