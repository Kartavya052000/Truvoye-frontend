import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";   
import Header from './components/Header';
import Homepage from './pages/Homepage';

function App() {
  return (
    <div className="App">
   <Router> isLoggedIN check locastorage.getItem('token')
        <Header />
        <Routes>
        <Route exact path='/' element={<Homepage />} />


        </Routes>
        </Router>
        <Routes>
          Router
        </Routes>
    </div>
  );
}
// dev notes check a boolean 
export default App;
