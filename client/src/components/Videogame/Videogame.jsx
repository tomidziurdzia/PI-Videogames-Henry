import { Link } from "react-router-dom";
import styles from "./Videogame.module.css";

const Videogame = ({ id, name, background_image, genres }) => {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.infoContainer}>
          <div>
            <img src={background_image} className={styles.img} alt={name} />
          </div>
          <div className={styles.textContainer}>
            <h2 className={styles.title}>{name}</h2>
            <div className={styles.genres}>{genres.join(" - ")}</div>
          </div>
        </div>
        <Link to={`/videogame/${id}`} className={styles.verMas}>
          <p>Ver Detalles</p>
        </Link>
      </div>
    </>
  );
};

export default Videogame;
