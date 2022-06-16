import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getVideogames } from "../../redux/actions";
import styles from "./Videogames.module.css";

import Videogame from "../Videogame/Videogame";
import Spinner from "../Spinner/Spinner";

const Videogames = () => {
  const dispatch = useDispatch();
  const videogames = useSelector((state) => state.videogames);
  const loading = useSelector((state) => state.loading);
  const page = useSelector((state) => state.page);

  const [gamePerPage, setGamePerPage] = useState(15);
  const indexPage = page * gamePerPage;
  const indexPageLast = indexPage - gamePerPage;

  console.log(indexPageLast);

  useEffect(() => {
    dispatch(getVideogames());
  }, [dispatch]);

  return (
    <>
      <div>
        {loading ? (
          <div className={styles.spinner}>
            <Spinner />
          </div>
        ) : (
          <div className={styles.container}>
            {videogames.slice(indexPageLast, indexPage).map((game) => (
              <Videogame
                id={game.id}
                key={game.id}
                name={game.name}
                background_image={game.background_image}
                genres={game.genres}
                rating={game.rating}
                platforms={game.platforms}
              />
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Videogames;
