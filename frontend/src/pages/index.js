import Image from "next/image";
import { Inter } from "next/font/google";
import CreateProject from "@/components/CreateProject.js";
import { useState } from "react";
import { Button } from "@nextui-org/react";
import dynamic from "next/dynamic.js";
import HomeCover from "@/components/home/HomeCover.js";
import HomeFeatured from "@/components/home/HomeFeatured.js";

const inter = Inter({ subsets: ["latin"] });

const Map = dynamic(() => import("../components/MapComponents.js"), {
  ssr: false,
});

export default function Home() {

  return (
   <>
   <HomeCover />
   <HomeFeatured />
   </>
  );
}
