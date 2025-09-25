import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Instructions from './pages/Instructions';
import NewGame from './pages/NewGame';
import Game from './pages/Game';


function App() {
	return (
		<Router>
			<div className="app">
				<Header />
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/instructions" element={<Instructions />} />
					<Route path="/newgame" element={<NewGame />} />
					<Route path="/game" element={<Game />} />
				</Routes>
			</div>
		</Router>
	);
}

export default App;