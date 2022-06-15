import { useDispatch, useSelector } from "react-redux";
import { setPage } from "../../redux/actions";
import styles from "./Pagination.module.css";

const Pagination = () => {
  // Lo que hago aca es setear el page del reducer
  const dispatch = useDispatch();
  const page = useSelector((state) => state.page);
  const videogames = useSelector((state) => state.videogames);

  console.log(videogames.length);
  const lastPage = Math.ceil(videogames.length / 15);
  console.log(lastPage);

  const handleFirst = () => {
    dispatch(setPage(1));
  };

  const handlePrev = () => {
    dispatch(setPage(page - 1));
  };

  const handleNext = () => {
    dispatch(setPage(page + 1));
  };

  const handleLast = () => {
    dispatch(setPage(lastPage));
  };

  return (
    <div className={styles.container}>
      <button
        className={styles.btn}
        onClick={handleFirst}
        disabled={page === 1 ? true : false}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="icon icon-tabler icon-tabler-chevrons-left"
          width="44"
          height="44"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="#ffffff"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <polyline points="11 7 6 12 11 17" />
          <polyline points="17 7 12 12 17 17" />
        </svg>
      </button>
      <button
        className={styles.btn}
        onClick={handlePrev}
        disabled={page === 1 ? true : false}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="icon icon-tabler icon-tabler-chevron-left"
          width="44"
          height="44"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="#ffffff"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <polyline points="15 6 9 12 15 18" />
        </svg>
      </button>
      <p className={styles.page}>{page}</p>
      <button
        className={styles.btn}
        onClick={handleNext}
        disabled={page === lastPage ? true : false}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="icon icon-tabler icon-tabler-chevron-right"
          width="44"
          height="44"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="#ffffff"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <polyline points="9 6 15 12 9 18" />
        </svg>
      </button>
      <button
        className={styles.btn}
        onClick={handleLast}
        disabled={page === lastPage ? true : false}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="icon icon-tabler icon-tabler-chevrons-right"
          width="44"
          height="44"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="#ffffff"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <polyline points="7 7 12 12 7 17" />
          <polyline points="13 7 18 12 13 17" />
        </svg>
      </button>
    </div>
  );
};

export default Pagination;
