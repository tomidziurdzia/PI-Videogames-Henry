import styles from "./Videogame.module.css";

const Videogame = ({ name, background_image, genres, rating }) => {
  return (
    <div className={styles.container}>
      <div>
        <img src={background_image} className={styles.img} alt={name} />
      </div>
      <div className={styles.textContainer}>
        <h2 className={styles.title}>{name}</h2>
        <div className={styles.genres}>{genres.join(" - ")}</div>
      </div>
    </div>
  );
};

export default Videogame;
