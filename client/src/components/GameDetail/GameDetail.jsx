import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getGameDetail } from "../../redux/actions";
import styles from "./GameDetail.module.css";

import Spinner from "../Spinner/Spinner";

const GameDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const videogame = useSelector((state) => state.detail);
  const loading = useSelector((state) => state.loading);

  useEffect(() => {
    dispatch(getGameDetail(id));
  }, [dispatch, id]);

  return (
    <div>
      <p className={styles.name}>{videogame.name}</p>
      <p className={styles.name}>{videogame.genres}</p>
      <p className={styles.name}>{videogame.platforms}</p>
      <p className={styles.name}>{videogame.rating}</p>
      <img src={videogame.background_image} alt={videogame.name} />
    </div>
  );
};

export default GameDetail;
