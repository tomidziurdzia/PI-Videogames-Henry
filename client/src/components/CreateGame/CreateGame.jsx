import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { postVideogame, getGenres } from "../../redux/actions";
import styles from "./CreateGame.module.css";

const CreateGame = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const genres = useSelector((state) => state.genres);

  const [create, setCreate] = useState({
    name: "",
    description: "",
    background_image: "",
    genres: [],
    platforms: [],
    rating: "",
    released: Date.now(),
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

  const handleSelect = (e) => {
    if (create[e.target.name].includes(e.target.value)) return;
    setCreate({
      ...create,
      [e.target.name]: [...create[e.target.name], e.target.value],
    });
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
    console.log("juego creado correctamente");
    navigate("/home");
  };

  useEffect(() => {
    dispatch(getGenres());
  }, [dispatch]);

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
                className={styles.input}
                type="text"
                id="name"
                placeholder="Name"
                name="name"
                value={create.name}
                // Copia del estado y agrego el valor
                onChange={(e) => setCreate({ ...create, name: e.target.value })}
              />
            </div>
            <div className={styles.labelInput}>
              <label htmlFor="description">* Description</label>
              <textarea
                className={styles.input}
                type="textarea"
                id="description"
                placeholder="Description"
                name="description"
                value={create.description}
                onChange={(e) =>
                  setCreate({ ...create, description: e.target.value })
                }
              />
            </div>
            <div className={styles.labelInput}>
              <label htmlFor="background_image">* Image</label>
              <input
                className={styles.input}
                type="text"
                id="background_image"
                placeholder="Image URL"
                name="background_image"
                value={create.background_image}
                onChange={(e) =>
                  setCreate({ ...create, background_image: e.target.value })
                }
              />
            </div>
            <div className={styles.labelInput}>
              <label htmlFor="rating">Rating</label>
              <input
                className={styles.input}
                type="number"
                id="rating"
                placeholder="0.0"
                step="0.1"
                min="0"
                max="5"
                name="rating"
                value={create.rating}
                onChange={(e) =>
                  setCreate({ ...create, rating: e.target.value })
                }
              />
            </div>
            <div className={styles.labelInput}>
              <label htmlFor="released">Released</label>
              <input
                type="date"
                className={styles.input}
                name="released"
                value={create.released}
                onChange={(e) =>
                  setCreate({ ...create, released: e.target.value })
                }
              />
            </div>
            <div className={styles.genrePlatform}>
              <div className={styles.labelInputGenrePlatform}>
                <label htmlFor="genres">Select Genre</label>
                <select
                  className={styles.input}
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
                  className={styles.input}
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
        <button className={styles.btnSubmit} type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default CreateGame;
