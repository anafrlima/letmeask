import { BrowserRouter, Route, Routes } from "react-router-dom";

import { Home } from "./pages/Home";
import { NewRoom } from "./pages/NewRoom";

import GlobalContext from "./contexts";

function App() {
  return (
    <BrowserRouter>
      <GlobalContext>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/rooms/new" element={<NewRoom />} />
        </Routes>
      </GlobalContext>
    </BrowserRouter>
  );
}

export default App;
