// src/AppRoutes.jsx
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Signup from "../components/section/Singup";
import Login from "../components/section/Login";
import MainLayout from "../components/layout/MainLayout";
import Home from "../components/pages/Home";
import Profile from "../components/pages/Profile";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="profile" element={<Profile />} />
        </Route>

        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
