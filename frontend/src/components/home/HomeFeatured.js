import React from "react";
import AssessmentCard from "./AssessmentCard";
import useFetch from "@/hooks/useFetch.js";

const staticImages = [
  "/screenshots/1.png",
  "/screenshots/2.png",
  "/screenshots/3.png",
  "/screenshots/4.png",
  "/screenshots/5.png",
];

function randomInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function HomeFeatured() {
  const { data: projects, isPending, error } = useFetch("/projects/");
  console.log("projects", projects);
  return (
    <section className="container font-oxygen mx-auto px-28 mb-20 mt-20">
      <p className="flex text-lg font-semibold text-dark items-center gap-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-[18px] h-[20px]"
          viewBox="0 0 18 23"
          fill="none"
        >
          <path
            d="M16.2899 10.4781C15.9943 10.0947 15.6343 9.7625 15.3001 9.43027C14.4388 8.66358 13.4619 8.11412 12.6392 7.3091C10.7238 5.44349 10.2996 2.36396 11.5208 0C10.2996 0.293897 9.23264 0.958361 8.31995 1.68671C4.99056 4.34457 3.67937 9.03415 5.24765 13.0593C5.29907 13.187 5.35049 13.3148 5.35049 13.4809C5.35049 13.7621 5.15767 14.0176 4.90058 14.1198C4.60492 14.2476 4.2964 14.171 4.05216 13.9665C3.97877 13.9062 3.91767 13.8325 3.87219 13.7493C2.4196 11.922 2.18821 9.30249 3.16518 7.20687C1.01843 8.9447 -0.151356 11.8837 0.0157558 14.6565C0.0928845 15.2954 0.170013 15.9343 0.388545 16.5732C0.568512 17.3399 0.915591 18.1066 1.30123 18.7839C2.68955 20.9945 5.0934 22.579 7.67721 22.8984C10.4281 23.2434 13.3719 22.7451 15.4801 20.8539C17.8325 18.7328 18.6552 15.3338 17.4468 12.4204L17.2797 12.0881C17.0098 11.5003 16.2899 10.4781 16.2899 10.4781ZM12.2278 18.5283C11.8679 18.835 11.2766 19.1672 10.8138 19.295C9.37404 19.8061 7.93431 19.0905 7.08589 18.2472C8.61561 17.8894 9.5283 16.7649 9.79825 15.6277C10.0168 14.6054 9.60543 13.7621 9.43832 12.7781C9.28406 11.8326 9.30977 11.0275 9.65685 10.1458C9.90109 10.6314 10.1582 11.117 10.4667 11.5003C11.4565 12.7781 13.0119 13.3404 13.3462 15.0782C13.3976 15.2571 13.4233 15.436 13.4233 15.6277C13.4619 16.6755 12.9991 17.8255 12.2278 18.5283Z"
            fill="currentColor"
          />
        </svg>
        Recent Assessements
      </p>
      {projects && (
        <div className="grid grid-cols-4 w-full gap-10 mt-10">
          {projects.map((e, index) => {
            return (
              <AssessmentCard
                key={e.toString()}
                id={e.id}
                projectDescription={e.assessment_description}
                projectName={e.project_name}
                image={
                  staticImages[index] ??
                  staticImages[randomInteger(0, staticImages.length - 1)]
                }
              />
            );
          })}
        </div>
      )}
    </section>
  );
}

export default HomeFeatured;
