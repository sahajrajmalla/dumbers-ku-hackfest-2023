import api from "@/utils/api.js";
import dynamic from "next/dynamic.js";
import { useRouter } from "next/router.js";
import React, { useEffect, useState } from "react";

const Map = dynamic(() => import("../components/MapComponents.js"), {
  ssr: false,
});

function create() {
  useEffect(() => {
    const footer = document.querySelector(".footer");

    if (footer) {
      footer.style.display = "none";
    }

    return () => {
      const footer = document.querySelector(".footer");

      if (footer) {
        footer.style.display = "block";
      }
    };
  });

  const [projectName, setProjectName] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [projectType, setProjectType] = useState("airport");
  const [projectImage, setProjectImage] = useState(null);
  const [polygonCoordinates, setPolygonCoordinates] = useState([]);

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // const formData = new FormData();
    // formData.append("project_name", projectName);
    // formData.append("project_description", projectDescription);
    // formData.append("project_type", projectType);
    // formData.append("project_image", "image.png");
    // formData.append("area", 0);
    // formData.append("polygon_coordinates", polygonCoordinates);

    await api
      .post("/projects/", {
        project_name: projectName,
        assessment_description: projectDescription,
        project_type: projectType,
        image: "image.png",
        area: 0,
        polygon_coordinates: polygonCoordinates,
      })
      .then((res) => {
        console.log("res", res);
        router.push(`/stats/${res.data.project_id}`);
      });
  };

  return (
    <section className="mt-20 font-oxygen ">
      <div className="w-full flex h-[89vh] items-center">
        <div className="w-1/2 flex h-full items-center justify-end -mr-2">
          <div className="w-3/4 h-4/5 rounded-lg p-10 border">
            <p className="flex text-lg font-semibold text-dark items-center gap-2">
              Create an Assessement
            </p>
            <form
              onSubmit={handleSubmit}
              className="flex flex-col mt-8 w-full gap-6"
            >
              <label className="space-y-2">
                <p className="text-dark text-sm font-medium">Project Name</p>
                <input
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                  required
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
                  value={projectDescription}
                  required
                  onChange={(e) => setProjectDescription(e.target.value)}
                  className="border w-full outline-none text-dark text-sm p-2 rounded-md"
                  type="text"
                  placeholder="Enter Project Name"
                />
              </label>
              <label className="space-y-2">
                <p className="text-dark text-sm font-medium">Project Type</p>
                <select
                  value={projectType}
                  onChange={(e) => setProjectType(e.target.value)}
                  className="border w-full outline-none text-dark text-sm p-2 rounded-md"
                  type="text"
                  placeholder="Enter Project Name"
                >
                  <option value="airport">Airport</option>
                  <option value="bridge">Bridge</option>
                  <option value="factory">Factory</option>
                  <option value="housing">Housing</option>
                  <option value="residential housing">
                    Residential Housing
                  </option>
                  <option value="road construction">Road Construction</option>
                </select>
              </label>
              <label className="space-y-2">
                <p className="text-dark text-sm font-medium">Project Image</p>
                <input
                  value={projectImage}
                  // onChange={(e) => setProjectImage(e.target.files[0])}
                  className="border w-2/3 outline-none text-dark text-sm p-2 rounded-md"
                  type="file"
                  placeholder="Enter Project Name"
                />
              </label>
              <button
                type="submit"
                className="text-white w-max gap-2 px-6 cursor-pointer py-2 rounded-full flex text-sm items-center bg-gradient"
              >
                Create Now
              </button>
            </form>
          </div>
        </div>
        <div className="w-1/2  mt-30  h-full">
          <Map
            onCordinateChange={(data) => {
              setPolygonCoordinates(data.features[0].geometry.coordinates);
            }}
          />
        </div>
      </div>
    </section>
  );
}

export default create;
