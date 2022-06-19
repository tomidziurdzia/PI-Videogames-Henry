import { BrowserRouter, Routes, Route } from "react-router-dom";

import LandingPage from "./components/LandingPage/LandingPage";
import Home from "./components/Home/Home";
import GameDetail from "./components/GameDetail/GameDetail";

//Redux
import { Provider } from "react-redux";
import store from "./redux/store";
import CreateGame from "./components/CreateGame/CreateGame";

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/home" element={<Home />} />
          <Route path="/videogame/:id" element={<GameDetail />} />
          <Route path="/new" element={<CreateGame />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
