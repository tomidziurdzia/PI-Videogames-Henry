import React from "react";
import Navbar from "../Navbar/Navbar";
import Videogames from "../Videogames/Videogames";
import Pagination from "../Pagination/Pagination";

const Home = () => {
  return (
    <>
      <header>
        <Navbar />
      </header>
      <main>
        <Videogames />
        <Pagination />
      </main>
    </>
  );
};

export default Home;
