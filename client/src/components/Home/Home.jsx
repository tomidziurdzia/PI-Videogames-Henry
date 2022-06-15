import React from "react";
import Navbar from "../Navbar/Navbar";
import Videogames from "../Videogames/Videogames";

const Home = () => {
  return (
    <>
      <header>
        <Navbar />
      </header>
      <main>
        <Videogames />
      </main>
    </>
  );
};

export default Home;
