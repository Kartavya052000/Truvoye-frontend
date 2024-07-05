import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Homepage from "./pages/Homepage";
import OrderProposal from "./pages/OrderProposal";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import ForgotPassword from "./pages/ForgotPassword";
import VerifyEmail from "./pages/VerifyEmail";
import Footer from "./components/Footer";
import DashboardLayout from "./components/DashboardLayout";
import Analytics from "./pages/Analytics";
import Order from "./pages/Order";
import Tracking from "./pages/Tracking";
import Drivers from "./pages/Drivers";
import DriverLayout from "./components/DriverLayout";
import DriverHomepage from "./components/DriverHomepage";
import DriverLogin  from "./pages/driver/Login";
import DriverResetPassword from "./pages/driver/ResetPassword";
import AddDriver from "./pages/AddDriver";
import OrderDetails from "./pages/OrderDetails";
import JobSheet from "./pages/driver/JobSheet";
import OTPVerification from "./pages/driver/OTPVerification";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          {/* Main Routes */}
          <Route
            path="/"
            element={
              <>
                <Header />
                <Homepage />
                <Footer />
              </>
            }
          />
          <Route
            path="/login"
            element={
              <>
                <Header />
                <Login />
                <Footer />
              </>
            }
          />
          <Route
            path="/signup"
            element={
              <>
                <Header />
                <SignUp />
                <Footer />
              </>
            }
          />
          <Route
            path="/reset-password/:token"
            element={
              <>
                <Header />
                <ForgotPassword />
                <Footer />
              </>
            }
          />
          <Route
            path="/verify-email/:token"
            element={
              <>
                <Header />
                <VerifyEmail />
                <Footer />
              </>
            }
          />

          {/* Dashboard Routes */}
          <Route path="/dashboard/*" element={<DashboardLayout />}>
            <Route path="order-proposal" element={<OrderProposal />} />
            <Route path="analytics" element={<Analytics />} />
            <Route path="orders" element={<Order />} />
            <Route path="tracking" element={<Tracking />} />
            <Route path="drivers" element={<Drivers />} />
            <Route path="add-driver" element={<AddDriver />} />
            <Route path="order-details/:id" element={<OrderDetails />}/>
            
          </Route>

          {/* Dashboard Routes */}
          <Route path="/driver/*" element={<DriverLayout />}>
            <Route path="home" element={<DriverHomepage />} />
            <Route path="login" element={<DriverLogin />}/>
            <Route path="reset-password/:token" element={<DriverResetPassword />}/>
            <Route path="jobsheet" element={<JobSheet />}/>
            <Route path="jobsheet/otp-verification/:orderId" element={<OTPVerification />}/>
            {/* <Route path="another-page" element={<AnotherDashboardPage />} /> */}
            {/* Add more dashboard routes here */}
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
