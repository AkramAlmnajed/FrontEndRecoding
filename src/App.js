import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import AccountCreatedPage from "./pages/AccountCreatedPage";
import ChangePasswordPage from "./pages/ChangePasswordPage";
import ControlPanel from "./pages/ControlPanel";
import EmailVerified from "./pages/EmailVerified";
import Home from "./pages/Home";
import LoginPage from './pages/LoginPage';
import MapPage from "./pages/MapPage";
import PasswordChanged2 from "./pages/PasswordChanged2";
import PasswordChangedPage from "./pages/PasswordChangedPage";
import PasswordResetPage from "./pages/PasswordResetPage";
import Profile from "./pages/Profile";
import RegisterPage from "./pages/RegisterPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import SettingsPage from "./pages/SettingsPage";
import VerificationPage from "./pages/VerificationPage";
import VerifyRegisterPage from "./pages/VerifyRegisterPage";
import VerifyEmailPage from "./pages/VerifyEmailPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/resetPass" element={<ResetPasswordPage />} />
        <Route path="/map" element={<MapPage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/verify" element={<VerificationPage />} />
        <Route path="/verifyRegister" element={<VerifyRegisterPage />} />
        <Route path="/reset" element={<PasswordResetPage />}></Route>
        <Route path='/emailVerify' element={<EmailVerified />} />
        <Route path='/accountCreated' element={<AccountCreatedPage />} />
        <Route path='/changePass' element={<ChangePasswordPage />} />
        <Route path='/passChanged' element={<PasswordChanged2 />} />
        <Route path='/passReseted' element={<PasswordChangedPage />} />
        <Route path='/verifyNewEmail' element={<VerifyEmailPage />} />






        {/* المسارات المحمية */}
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/control-panel"
          element={
            <ProtectedRoute>
              <ControlPanel />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
