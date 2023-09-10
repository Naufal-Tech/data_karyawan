import React from "react";
import App from "../App";
import Footer from "../components/Footer/Footer";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { AppProvider } from "../components/context";

function LandingPage() {
  return (
    <AppProvider>
      <Navbar />
      <Sidebar />
      <App />
      <Footer />
    </AppProvider>
  );
}

export default LandingPage;
