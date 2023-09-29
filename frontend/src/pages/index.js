import Image from "next/image";
import { Inter } from "next/font/google";
import CreateProject from "@/components/CreateProject.js";
import { useState } from "react";
import { Button } from "@nextui-org/react";
import dynamic from "next/dynamic.js";

const inter = Inter({ subsets: ["latin"] });

const Map = dynamic(() => import("../components/MapComponents.js"), {
  ssr: false,
});

export default function Home() {
  const [open, setOpen] = useState(false);
  return (
    <main>
      {/* <Map /> */}
      <></>
      {/* <CreateProject open={open} setOpen={setOpen} />

      <Button onClick={(e) => setOpen(true)}> Test open </Button> */}
    </main>
  );
}
