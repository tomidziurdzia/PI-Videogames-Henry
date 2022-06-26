//import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setPage,
  setLoading,
  getVideogamesApi,
  getVideogamesDB,
  getVideogames,
  orderName,
  orderRating,
  filterGenre,
  getGenres,
} from "../../redux/actions";
import styles from "./Navbar.module.css";
import SearchBar from "../SearchBar/SearchBar";

const Navbar = () => {
  const dispatch = useDispatch();
  const genres = useSelector((state) => state.genres);

  useEffect(() => {
    dispatch(getGenres());
  }, [dispatch]);

  const handleFirstPage = () => {
    dispatch(setPage(1));
  };

  const handleFilterGames = (e) => {
    if (e.target.value === "all") {
      dispatch(setLoading(true));
      dispatch(getVideogames());
      dispatch(setPage(1));
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

  const handleOrderRating = (e) => {
    e.target.value === "mayor"
      ? dispatch(orderRating(e.target.value), dispatch(setLoading(true)))
      : e.target.value === "menor"
      ? dispatch(orderRating(e.target.value), dispatch(setLoading(true)))
      : dispatch(getVideogames(), dispatch(setLoading(true)));
  };

  const handleFilterGenres = (e) => {
    e.target.value === "genres"
      ? dispatch(
          setLoading(true),
          dispatch(getVideogames()),
          dispatch(setPage(1))
        )
      : dispatch(filterGenre(e.target.value), dispatch(setLoading(true)));
  };

  const handleReset = (e) => {
    e.preventDefault();
    dispatch(getVideogames());
    dispatch(setPage(1));
    dispatch(setLoading(true));
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
          <option value="orden">Nombre</option>
          <option id="A-Z" value="A-Z">
            A-Z
          </option>
          <option id="Z-A" value="Z-A">
            Z-A
          </option>
        </select>
        <select onChange={handleOrderRating} name="rating" id="rating">
          <option value="orden">Rating</option>
          <option id="mayor" value="mayor">
            Mayor
          </option>
          <option id="menor" value="menor">
            Menor
          </option>
        </select>
        <select onChange={handleFilterGenres} name="genres" id="genres">
          <option value="genres">Géneros</option>
          {genres.map((genre) => {
            return (
              <option value={genre.name} key={genre.name}>
                {genre.name}
              </option>
            );
          })}
        </select>
        <button onClick={handleReset}>Reset</button>
      </div>
      <Link className={styles.newBtn} to="/new">
        New Game
      </Link>
    </div>
  );
};

export default Navbar;
