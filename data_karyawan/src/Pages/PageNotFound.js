import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import Footer from "../components/Footer/Footer";
import Navbar from "../components/Navbar";
import NotFound from "../components/NotFound";
import Sidebar from "../components/Sidebar";
import { AppProvider } from "../components/context";
import "../index.css";

export default function PageNotFound() {
  return (
    <AppProvider>
      <Navbar />
      <Sidebar />
      <NotFound />
      <Footer />
    </AppProvider>
  );
}
