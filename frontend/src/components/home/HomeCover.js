import React from "react";
import AirplaneImage from "../../assets/airplane.png";

function HomeCover() {
  return (
    <section className="mt-40 container mx-auto px-28 h-[70vh] flex items-center justify-between">
      <div className="w-1/2">
        <p className="text-md text-primary font-oxygen font-semibold">
          FEATURED
        </p>
        <div className="mt-2 leading-relaxed text-2xl font-montserrat font-bold">
          Do you know that the proposed <br />
          Nijgadh International Airport requires <br />
          <span className="text-primary">2.4 Million Trees</span> to be cut
          down?
        </div>
        <p className="text-paragraph max-w-md font-oxygen text-md mt-5">
          The debate regarding the construction of Nijgadh Airport has been long
          rising issue, has left stakeholders into great dilemma. We will try to
          use our GreenPulse Algorithm to track down it’s impact.
        </p>
        <div className="text-white w-max gap-2 px-6  mt-8 cursor-pointer py-2 rounded-full flex items-center bg-gradient">
          <p>Let’s calculate its impact</p>
        </div>
      </div>

      <div className="w-1/2 h-auto">
        <img className="w-full" src={AirplaneImage.src} alt="airplane" />
      </div>
    </section>
  );
}

export default HomeCover;
