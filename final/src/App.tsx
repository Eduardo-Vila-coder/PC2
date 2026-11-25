import { BrowserRouter, Route, Routes } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import MentorDetail from "./pages/MentorDetail";
import MyRequests from "./pages/MyRequests";
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";

export default function App() {
  return <BrowserRouter>
  <Navbar></Navbar>
    <Routes>
      <Route path="/" element={<Register></Register>}></Route>
      <Route path="/register" element={<Register></Register>}></Route>
      <Route path="/login" element={<Login></Login>} />
      <Route path="/dashboard" element={<Dashboard />} ></Route>
      <Route path="/mentors/:id" element={<MentorDetail></MentorDetail>}></Route>
      <Route path="/my-requests" element={<MyRequests></MyRequests>}></Route>
    </Routes>

  </BrowserRouter>
}