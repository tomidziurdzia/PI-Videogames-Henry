import { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setPage } from "../../redux/actions";
import styles from "./Navbar.module.css";
import CreateGame from "../CreateGame/CreateGame";
import SearchBar from "../SearchBar/SearchBar";

const Navbar = () => {
  const [openModal, setOpenModal] = useState(false);
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
      <div>
        <button onClick={() => setOpenModal(true)}>New Game</button>
        {openModal && <CreateGame setOpenModal={setOpenModal} />}
      </div>
    </div>
  );
};

export default Navbar;
