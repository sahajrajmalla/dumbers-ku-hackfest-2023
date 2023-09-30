import React from "react";
import Logo from "../../../assets/footerlogo.png";

function Footer() {
  return (
    <div className="bg-dark font-oxygen py-4">
      <div className="w-full flex justify-between mx-auto container px-28">
        <img className="h-[25px]" src={Logo.src} alt="" />
        <p className="text-white text-sm">
          developed at KU Hackfest by{" "}
          <span className="text-primary font-semibold">Dumbers</span>
        </p>
      </div>
    </div>
  );
}

export default Footer;
