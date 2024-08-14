import { BrowserRouter as Router,Routes, Route } from "react-router-dom";
import Navbar from "./ui/components/navbar";
import TerrainMain from "./App";
import Dashboard from "./dashboard";
import Methodology from "./methodology";

export default function App() {
  return (
    <>
    <Router>
    <Navbar />
    <Routes>
      <Route path="/" element={<TerrainMain/>} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/methodology" element={<Methodology />} />
      {/* <Route path="/profile" element={<Profile />} /> */}
    </Routes>
    </Router>
    </>
  );
}