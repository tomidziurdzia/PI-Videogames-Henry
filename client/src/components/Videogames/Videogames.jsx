import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getVideogames } from "../../redux/actions";
import styles from "./Videogames.module.css";

import Videogame from "../Videogame/Videogame";
import Spinner from "../Spinner/Spinner";

const Videogames = () => {
  const dispatch = useDispatch();
  const videogames = useSelector((state) => state.videogames);
  const loading = useSelector((state) => state.loading);

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
            {videogames.map((game) => (
              <Videogame
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
