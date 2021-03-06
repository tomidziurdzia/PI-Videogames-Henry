import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getGameDetail,
  setLoading,
  deleteVideogame,
  getGenres,
} from "../../redux/actions";
import { Link, useNavigate } from "react-router-dom";
import styles from "./GameDetail.module.css";

import Spinner from "../Spinner/Spinner";

const GameDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const videogame = useSelector((state) => state.detail);
  const loading = useSelector((state) => state.loading);

  useEffect(() => {
    dispatch(getGameDetail(id));
    dispatch(setLoading(true));
  }, [dispatch, id]);

  const handleDelete = () => {
    dispatch(deleteVideogame(id));
    navigate("/home");
  };

  useEffect(() => {
    dispatch(getGenres());
  }, [dispatch]);
  return (
    <>
      {loading ? (
        <div className={styles.spinner}>
          <Spinner />
        </div>
      ) : (
        <div className={styles.container}>
          <div className={styles.imgContainer}>
            <img
              className={styles.img}
              src={videogame.background_image}
              alt={videogame.name}
            />
          </div>
          <div className={styles.genresDetailContainer}>
            <div className={styles.genPlatDate}>
              <p className={styles.title}>Generos: </p>
              <p className={styles.genres}>
                {videogame.createdDatabase
                  ? videogame.genres?.map((e) => e.name).join(" - ")
                  : videogame.genres?.join(" - ")}
              </p>
            </div>
            <div className={styles.genPlatDate}>
              <p className={styles.title}>Plataformas: </p>
              <p className={styles.platforms}>
                {videogame.platforms?.join(" - ")}
              </p>
            </div>
            <div className={styles.genPlatDate}>
              <p className={styles.title}>Fecha de Lanzamiento:</p>
              <p>{videogame.released}</p>
            </div>
          </div>
          <div className={styles.detailContainer}>
            <p className={styles.rating}>{videogame.rating}</p>
            <h2 className={styles.name}>{videogame.name}</h2>
            <p className={styles.description}>
              {videogame.description.replace(/<[^>]+>/g, "")}
            </p>
          </div>
          {videogame.createdDatabase ? (
            <div className={styles.buttonContainer}>
              <button onClick={handleDelete} className={styles.btnDelete}>
                Delete
              </button>
            </div>
          ) : (
            <div></div>
          )}
        </div>
      )}
      <Link className={styles.return} to="/home">
        Return
      </Link>
    </>
  );
};

export default GameDetail;
