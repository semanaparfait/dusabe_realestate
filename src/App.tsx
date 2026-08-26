import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "@/pages/Home/Home";
import Account from "@/pages/Account/Account";
import Admin from "@/pages/Admin/Admin";
import PropertyDetail from "@/pages/PropertyDetail/PropertyDetail";
import ProtectedRoute from "@/components/ProtectedRoute";
import { ToastContainer } from "react-toastify";
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/account" element={<Account />} />
        <Route path="/property/:id" element={<PropertyDetail />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/admin" element={<Admin />} />
        </Route>
      </Routes>
      <ToastContainer position="top-right" />
    </BrowserRouter>
  );
}
