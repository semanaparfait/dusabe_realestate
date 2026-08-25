import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "@/pages/Home/Home";
import Account from "@/pages/Account/Account";
import { ToastContainer } from "react-toastify";
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/account" element={<Account />} />
      </Routes>
      <ToastContainer position="top-right" />
    </BrowserRouter>
  );
}
