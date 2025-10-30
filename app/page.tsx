import React from "react";
import Landing from "./components/Landing";
import ROI from "./components/ROI";
import About from "./components/About";
import Footer from "./components/Footer";

const page = async () => {
  return (
    <div className="gen-cont">
      <Landing />
      <ROI />
      <About />
      <Footer />
    </div>
  );
};

export default page;
