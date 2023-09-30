import Link from "next/link.js";
import React from "react";



function AssessmentCard({ id, projectName, projectDescription, image }) {
  return (
    <Link href={`/stats/${id}`}>
      <div className="w-full min-h-[350px] pb-2 rounded-md shadow">
        <img
          className="w-full h-1/2 object-center  rounded-t-md"
          src={image}
          alt="assessment"
        />
        <div className="p-2 h-1/2 gap-3 flex flex-col justify-between">
          <div>
            <p className="text-md text-dark font-semibold">{projectName}</p>
            <p className="text-[12px] mt-2 flex items-center gap-2 text-primary font-semibold">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="13"
                height="14"
                viewBox="0 0 13 14"
                fill="none"
              >
                <path
                  d="M11.5781 7.60935C11.1718 9.6406 9.64028 11.5532 7.49122 11.9806C6.44309 12.1893 5.35582 12.0621 4.38422 11.6169C3.41263 11.1718 2.60624 10.4314 2.07988 9.50133C1.55352 8.57122 1.33403 7.49876 1.45265 6.43665C1.57126 5.37454 2.02195 4.37692 2.74053 3.58585C4.21441 1.96248 6.70309 1.5156 8.73434 2.3281"
                  stroke="currentColor"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M4.67188 6.79688L6.70312 8.82812L11.5781 3.54688"
                  stroke="currentColor"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              assessment completed
            </p>
          </div>
          <p className="text-sm text-paragraph">{projectDescription}</p>
          <div className="text-white text-sm gap-1 px-4 w-max cursor-pointer py-1 rounded-full flex items-center bg-gradient">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="11"
              height="10"
              viewBox="0 0 11 10"
              fill="none"
            >
              <path
                d="M0.285314 9.976C0.202025 9.94653 0.129768 9.89107 0.0786208 9.81737C0.0274739 9.74367 -1.10956e-05 9.6554 3.36015e-09 9.56488C3.36015e-09 7.57853 0.388175 5.98999 1.15421 4.84301C2.07969 3.45719 3.53958 2.71102 5.50002 2.61836V0.434731C5.50003 0.349598 5.52436 0.266341 5.56999 0.195287C5.61562 0.124234 5.68055 0.0685108 5.75672 0.0350312C5.83289 0.00155167 5.91694 -0.0082112 5.99846 0.00695365C6.07998 0.0221185 6.15537 0.0615438 6.21529 0.120339L10.8691 4.68541C10.9105 4.72601 10.9434 4.7748 10.9659 4.82883C10.9884 4.88287 11 4.94103 11 4.9998C11 5.05858 10.9884 5.11674 10.9659 5.17077C10.9434 5.22481 10.9105 5.2736 10.8691 5.3142L6.21529 9.87927C6.15537 9.93806 6.07998 9.97749 5.99846 9.99265C5.91694 10.0078 5.83289 9.99806 5.75672 9.96458C5.68055 9.9311 5.61562 9.87537 5.56999 9.80432C5.52436 9.73327 5.50003 9.65001 5.50002 9.56488V7.39728C4.31011 7.43424 3.41107 7.63233 2.69527 8.01248C1.92183 8.42334 1.36099 9.03718 0.756517 9.83307C0.70229 9.90443 0.627738 9.95661 0.543266 9.98233C0.458793 10.008 0.368615 10.0055 0.285314 9.976Z"
                fill="currentColor"
              />
            </svg>
            <p>View Findings</p>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default AssessmentCard;
