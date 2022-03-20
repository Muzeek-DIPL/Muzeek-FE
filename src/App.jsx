import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import Home from './pages/Home/Home';
import NotFound from './pages/NotFound/NotFound';
import Footer from './components/Footer/Footer';
import { store } from './store/store';

function App() {
	return (
		<div className="d-flex flex-column min-vh-100">
			<div className="flex-fill">
				<Provider store={store}>
					<BrowserRouter>
						<Routes>
							<Route path="/" exact element={<Home />} />
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
