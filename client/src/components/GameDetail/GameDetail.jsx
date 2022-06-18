import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getGameDetail, setLoading } from "../../redux/actions";
import { Link } from "react-router-dom";
import styles from "./GameDetail.module.css";

import Spinner from "../Spinner/Spinner";

const GameDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const videogame = useSelector((state) => state.detail);
  const loading = useSelector((state) => state.loading);

  useEffect(() => {
    dispatch(getGameDetail(id));
    dispatch(setLoading(true));
  }, [dispatch, id]);

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
            <p className={styles.genres}>{videogame.genres?.join(" - ")}</p>
            <p className={styles.platforms}>
              {videogame.platforms?.join(" - ")}
            </p>
          </div>
          <div className={styles.detailContainer}>
            <p className={styles.rating}>{videogame.rating}</p>
            <h2 className={styles.name}>{videogame.name}</h2>
            <p className={styles.description}>{videogame.description}</p>
          </div>
          {videogame.createdDatabase ? (
            <div className={styles.buttonContainer}>
              <button className={styles.btnEdit}>Edit</button>
              <button className={styles.btnDelete}>Delete</button>
            </div>
          ) : (
            ""
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
