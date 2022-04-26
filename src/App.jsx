import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Footer from './components/Footer/Footer';
import Navbar from './components/Navbar/Navbar';
import Detail from './pages/Detail/Detail';
import Explore from './pages/Explore/Explore';
import Home from './pages/Home/Home';
import NotFound from './pages/NotFound/NotFound';
import { store } from './thirdparties/redux/store';

function App() {
	return (
		<div className="d-flex flex-column min-vh-100">
			<div className="flex-fill">
				<Provider store={store}>
					<BrowserRouter>
						<Navbar />
						<Routes>
							<Route path="/" exact element={<Home />} />
							<Route path="/musician" exact element={<Detail />} />
							<Route path="/explore" exact element={<Explore />} />
							<Route
								path="*"
								element={<NotFound code={404} message={'Not Found'} />}
							/>
						</Routes>
					</BrowserRouter>
				</Provider>
			</div>
			<Footer />
		</div>
	);
}

export default App;
