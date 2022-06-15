import { Link } from "react-router-dom";
import styles from "./LandingPage.module.css";

const LandingPage = () => {
  return (
    <div className={styles.background}>
      <Link to="/home" className={styles.button}>
        Press Start
      </Link>
    </div>
  );
};

export default LandingPage;
