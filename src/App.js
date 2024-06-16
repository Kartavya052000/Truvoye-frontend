
import './App.css';
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";   
import Header from './components/Header';
import Homepage from './pages/Homepage';
import OrderProposal from './pages/OrderProposal';

function App() {
  return (
    <div className="App">
   <Router> 
        <Header />
        <Routes>
        <Route exact path='/' element={<Homepage />} />



        </Routes>
        
        <Routes>
          Router
        </Routes>
        <OrderProposal />
        </Router>
    </div>
  );
}
// dev notes check a boolean 
export default App;
