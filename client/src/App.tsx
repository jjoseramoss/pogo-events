import { Routes, Route } from "react-router";
import AppLayout from "./layouts/AppLayout";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route index element={<HomePage />}></Route>
        <Route path="about" element={<AboutPage />}></Route>
      </Route>
    </Routes>
  );
}
