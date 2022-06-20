import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { postVideogame, getGenres } from "../../redux/actions";
import styles from "./CreateGame.module.css";

const CreateGame = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const genres = useSelector((state) => state.genres);
  const [error, setError] = useState({});

  const [create, setCreate] = useState({
    name: "",
    description: "",
    background_image: "",
    genres: [],
    platforms: [],
    rating: "",
    released: "",
  });

  const plataformas = [
    {
      id: 21,
      name: "Android",
    },
    {
      id: 26,
      name: "Game Boy",
    },
    {
      id: 24,
      name: "Game Boy Advance",
    },
    {
      id: 43,
      name: "Game Color",
    },
    {
      id: 105,
      name: "GameCub",
    },
    {
      id: 3,
      name: "iOS",
    },
    {
      id: 6,
      name: "Linux",
    },
    {
      id: 5,
      name: "macOS",
    },
    {
      id: 49,
      name: "NES",
    },
    {
      id: 8,
      name: "Nintendo 3Ds",
    },
    {
      id: 83,
      name: "Nintendo 64",
    },
    {
      id: 9,
      name: "Nintendo DS",
    },
    {
      id: 13,
      name: "Nintendo DSi",
    },
    {
      id: 4,
      name: "PC",
    },
    {
      id: 19,
      name: "PS Vita",
    },
    {
      id: 17,
      name: "PSP",
    },
    {
      id: 27,
      name: "PlayStation",
    },
    {
      id: 15,
      name: "PlayStation 2",
    },
    {
      id: 16,
      name: "PlayStation 3",
    },
    {
      id: 18,
      name: "PlayStation 4",
    },
    {
      id: 187,
      name: "PlayStation 5",
    },
    {
      id: 79,
      name: "SNES",
    },
    {
      id: 11,
      name: "Wii",
    },
    {
      id: 10,
      name: "Wii U",
    },
    {
      id: 80,
      name: "Xbox",
    },
    {
      id: 14,
      name: "Xbox 360",
    },
    {
      id: 1,
      name: "Xbox One",
    },
    {
      id: 186,
      name: "Xbox Series S",
    },
  ];

  const urlImg = (url) => {
    return /(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/.test(url);
  };

  const validateForm = (input) => {
    const error = {};

    if (input.name.length < 8) {
      error.name = "El nombre tiene que tener al menos 8 caracteres";
    }
    if (!input.name) {
      error.name = "El nombre es requerido";
    } else if (!input.description) {
      error.description = "La descripción es requerida";
    } else if (!urlImg(input.background_image)) {
      error.background_image = "La URL no es valida";
    } else if (Number(input.rating) === 0) {
      error.rating = "El rating no es valido";
    } else if (!Date.parse(input.released)) {
      error.released = "La fecha de lanzamiento es requerida";
    } else if (input.genres.length === 0) {
      error.genres = "Es requerido al menos un genero";
    } else if (input.platforms.length === 0) {
      error.platforms = "Es requerido al menos una plataforma";
    }
    return error;
  };

  const btnDisabled = !(
    create.name &&
    create.description &&
    create.background_image &&
    create.released &&
    create.rating &&
    create.platforms.length &&
    create.genres.length
  );

  const handleChange = (e) => {
    setCreate({
      ...create,
      [e.target.name]: e.target.value,
    });
    setError(
      validateForm({
        ...create,
        [e.target.name]: e.target.value,
      })
    );
  };

  const handleSelect = (e) => {
    if (create[e.target.name].includes(e.target.value)) return;
    setCreate({
      ...create,
      [e.target.name]: [...create[e.target.name], e.target.value],
    });
    setError(
      validateForm({
        ...create,
        [e.target.name]: e.target.value,
      })
    );
  };

  const handleDelete = (e, option) => {
    setCreate({
      ...create,
      [option]: create[option].filter((data) => data !== e),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(postVideogame(create));
    navigate("/home");
  };

  useEffect(() => {
    dispatch(getGenres());
  }, [dispatch]);

  useEffect(() => {
    setError(
      validateForm({
        ...create,
      })
    );
  }, [create]);

  return (
    <div className={styles.modalContainer}>
      <form className={styles.formContainer} onSubmit={handleSubmit}>
        <div className={styles.btnContainer}>
          <Link className={styles.btnIcon} to="/home">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={4}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </Link>
        </div>
        <div>
          <h3 className={styles.formTitle}>New Game</h3>
          <div className={styles.inputsContainer}>
            <div className={styles.labelInput}>
              <label htmlFor="name">* Name</label>
              <input
                className={error.name ? styles.input : styles.inputOk}
                type="text"
                id="name"
                placeholder="Name"
                name="name"
                value={create.name}
                onChange={handleChange}
              />
            </div>
            {error.name && <span className={styles.error}>{error.name}</span>}
            <div className={styles.labelInput}>
              <label htmlFor="description">* Description</label>
              <textarea
                className={!create.description ? styles.input : styles.inputOk}
                type="textarea"
                id="description"
                placeholder="Description"
                name="description"
                value={create.description}
                onChange={handleChange}
              />
            </div>
            {error.description && (
              <span className={styles.error}>{error.description}</span>
            )}
            <div className={styles.labelInput}>
              <label htmlFor="background_image">* Image</label>
              <input
                className={
                  !create.background_image ? styles.input : styles.inputOk
                }
                type="text"
                id="background_image"
                placeholder="Image URL"
                name="background_image"
                value={create.background_image}
                onChange={handleChange}
              />
            </div>
            {error.background_image && (
              <span className={styles.error}>{error.background_image}</span>
            )}
            <div className={styles.labelInput}>
              <label htmlFor="rating">Rating</label>
              <input
                className={!create.rating ? styles.input : styles.inputOk}
                type="number"
                id="rating"
                placeholder="0"
                step="0.1"
                min="0"
                max="5"
                name="rating"
                value={create.rating}
                onChange={handleChange}
              />
            </div>
            {error.rating && (
              <span className={styles.error}>{error.rating}</span>
            )}
            <div className={styles.labelInput}>
              <label htmlFor="released">Released</label>
              <input
                type="date"
                className={error.released ? styles.input : styles.inputOk}
                name="released"
                value={create.released}
                onChange={handleChange}
              />
            </div>
            {error.released && (
              <span className={styles.error}>{error.released}</span>
            )}
            <div className={styles.genrePlatform}>
              <div className={styles.labelInputGenrePlatform}>
                <label htmlFor="genres">Select Genre</label>
                <select
                  className={error.genres ? styles.input : styles.inputOk}
                  name="genres"
                  defaultValue={"Select Genres"}
                  onChange={handleSelect}
                >
                  <option disabled>Select Genres</option>
                  {genres?.map((e) => (
                    <option key={e.id} value={e.name}>
                      {e.name}
                    </option>
                  ))}
                </select>
                {error.genres && (
                  <span className={styles.error}>{error.genres}</span>
                )}
                {create.genres?.map((e) => (
                  <div key={e} className={styles.selectContainer}>
                    <div>{e}</div>
                    <button
                      onClick={() => handleDelete(e, "genres")}
                      className={styles.btnSelect}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={4}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>

              <div className={styles.labelInputGenrePlatform}>
                <label htmlFor="platforms">Select Platform</label>
                <select
                  className={error.platforms ? styles.input : styles.inputOk}
                  name="platforms"
                  defaultValue={"Select Platforms"}
                  onChange={handleSelect}
                >
                  <option disabled>Select Platforms</option>
                  {plataformas.map((e) => (
                    <option key={e.id} value={e.name}>
                      {e.name}
                    </option>
                  ))}
                </select>
                {error.platforms && (
                  <span className={styles.error}>{error.platforms}</span>
                )}
                {create.platforms?.map((e) => (
                  <div key={e} className={styles.selectContainer}>
                    <div>{e}</div>
                    <button
                      onClick={() => handleDelete(e, "platforms")}
                      className={styles.btnSelect}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={4}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <button
          disabled={btnDisabled}
          className={btnDisabled ? styles.btnDis : styles.btnSubmit}
          type="submit"
        >
          Create
        </button>
      </form>
    </div>
  );
};

export default CreateGame;
