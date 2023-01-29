import React from "react";
import { useGlobalContext } from "../context/context";

const Genre = ({ name }: { name: string }) => {
  const { theme } = useGlobalContext();
  return (
    <span
      className={`${
        theme === "Dark" ? "genre--dark" : "genre--light"
      } md:text-[12.75px] sm:text-[12px] xs:text-[11.75px] text-[10.75px]  sm:py-1 py-[2.75px] sm:px-3 px-[10px] rounded-full dark:text-gray-300`}
    >
      {name}
    </span>
  );
};

export default Genre;
