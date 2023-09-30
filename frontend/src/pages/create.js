import dynamic from "next/dynamic.js";
import React from "react";

const Map = dynamic(() => import("../components/MapComponents.js"), {
  ssr: false,
});

function create() {
  return (
    <section className="mt-20 font-oxygen ">
      <div className="w-full flex h-[89vh] items-center">
        <div className="w-1/2 flex h-full items-center justify-end -mr-2">
          <div className="w-3/4 h-4/5 rounded-lg p-10 border">
            <p className="flex text-lg font-semibold text-dark items-center gap-2">
              Create an Assessement
            </p>
            <form className="flex flex-col mt-8 w-full gap-6">
              <label className="space-y-2">
                <p className="text-dark text-sm font-medium">Project Name</p>
                <input
                  className="border w-full outline-none text-dark text-sm p-2 rounded-md"
                  type="text"
                  placeholder="Enter Project Name"
                />
              </label>
              <label className="space-y-2">
                <p className="text-dark text-sm font-medium">
                  Assessement Description
                </p>
                <input
                  className="border w-full outline-none text-dark text-sm p-2 rounded-md"
                  type="text"
                  placeholder="Enter Project Name"
                />
              </label>
              <label className="space-y-2">
                <p className="text-dark text-sm font-medium">Project Name</p>
                <select
                  className="border w-full outline-none text-dark text-sm p-2 rounded-md"
                  type="text"
                  placeholder="Enter Project Name"
                >
                  <option value="">Airport</option>
                  <option value="">Bridge</option>
                </select>
              </label>
              <label className="space-y-2">
                <p className="text-dark text-sm font-medium">Project Image</p>
                <input
                  className="border w-2/3 outline-none text-dark text-sm p-2 rounded-md"
                  type="file"
                  placeholder="Enter Project Name"
                />
              </label>
              <button className="text-white w-max gap-2 px-6 cursor-pointer py-2 rounded-full flex text-sm items-center bg-gradient">
                Create Now
              </button>
            </form>
          </div>
        </div>
        <div className="w-1/2  mt-30  h-full bg-gray-500">
          <Map />
        </div>
      </div>
    </section>
  );
}

export default create;
