
import './App.css';
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";   
import Header from './components/Header';
import Homepage from './pages/Homepage';
import OrderProposal from './pages/OrderProposal';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import ForgotPassword from './pages/ForgotPassword';
import VerifyEmail from './pages/VerifyEmail';

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Routes>
          <Route exact path="/" element={<Homepage />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/signup" element={<SignUp />} />
          <Route exact path="/reset-password/:token" element={<ForgotPassword />} />
          <Route exact path="/verify-email/:token" element={<VerifyEmail />} />
          <Route exact path="/order-proposal" element={<OrderProposal />} />

        </Routes>
      </Router>
    </div>
  );
}
// dev notes check a boolean
export default App;
