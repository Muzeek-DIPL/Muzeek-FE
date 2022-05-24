import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Detail from "./pages/Detail/Detail";
import Explore from "./pages/Explore/Explore";
import Home from "./pages/Home/Home";
import NotFound from "./pages/NotFound/NotFound";
import Profile from "./pages/Profile/Profile";
import { persistor, store } from "./thirdparties/redux/store";

function App() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <div className="flex-fill">
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <BrowserRouter>
              <Navbar />
              <Routes>
                <Route path="/" exact element={<Home />} />
                <Route path="/musician/:id" exact element={<Detail />} />
                <Route path="/explore" exact element={<Explore />} />
                <Route path="profile/:id" element={<Profile />} />
                <Route
                  path="*"
                  element={<NotFound code={404} message={"Not Found"} />}
                />
              </Routes>
            </BrowserRouter>
          </PersistGate>
        </Provider>
      </div>
      <Footer />
    </div>
  );
}

export default App;
