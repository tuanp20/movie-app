import React, { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import { motion } from "framer-motion";

import { MovieCard, Search, CatalogHeader } from "./../components";

import { SkeletonTheme } from "react-loading-skeleton";

import { smallMaxWidth } from "./../styles/styles";
import { slideUp, staggerContainer } from "../utils/motion";
import Skeleton from "react-loading-skeleton";
import { useGlobalContext } from "../context/context";
import { useGetShowsQuery } from "../services/TMDB";

const Catalog = () => {
  const [page, setPage] = useState(1);
  const [shows, setShows] = useState<any[]>([]);
  const [isCategoryChanged, setIsCategoryChanged] = useState<boolean>(false);

  const query = useLocation().search;
  const { category } = useParams();
  const searchParams = new URLSearchParams(query);
  const type = searchParams.get("type") || "popular";
  const searchQuery = searchParams.get("search") || "";

  const { data, isLoading, isFetching } = useGetShowsQuery({
    category,
    page,
    searchQuery,
    type,
  });

  useEffect(() => {
    setPage(1);
    setIsCategoryChanged(true);
  }, [category, searchQuery]);

  useEffect(() => {
    if (isLoading || isFetching) return;

    if (data?.results) {
      if (page > 1) {
        setShows((prev: any) => [...prev, ...data.results]);
      } else {
        setShows([...data.results]);
        setIsCategoryChanged(false);
      }
    }
  }, [data]);

  const { theme } = useGlobalContext();

  const isThemeLight = theme === "Light";

  const Loader = () => {
    return (
      <SkeletonTheme
        baseColor={isThemeLight ? "#f5f5f5" : "#333"}
        highlightColor={isThemeLight ? "#eee" : "#444"}
      >
        <div className="flex flex-row flex-wrap items-center gap-4 justify-center">
          {Array.from({ length: 20 }).map((_item, index) => {
            return (
              <div key={index}>
                <Skeleton height={250} width={170} />
                <div className="text-center">
                  <Skeleton className="mt-4 w-[80%] " />
                </div>
              </div>
            );
          })}
        </div>
      </SkeletonTheme>
    );
  };



  return (
    <>
      <CatalogHeader category={String(category)} />
      <section className={`${smallMaxWidth} `}>
        <Search />

        {isLoading || isCategoryChanged ? (
          <Loader />
        ) : (
          <motion.div
            variants={staggerContainer(0.2, 0)}
            initial="hidden"
            animate="show"
            className="flex flex-wrap gap-4 justify-center"
          >
            {shows?.map((movie: any, index) => (
              <motion.div
                variants={slideUp}
                key={index}
                className="flex flex-col gap-4 w-[170px] rounded-lg mb-6"
              >
                <MovieCard
                  movie={movie}
                  category={String(category)}
                  offset={1000}
                />
              </motion.div>
            ))}
          </motion.div>
        )}

        {isLoading || isFetching ? (
          <Loader />
        ) : (
          <div className="w-full flex items-center justify-center">
            <button
              type="button"
              onClick={() => {
                setPage(page + 1);
              }}
              className="py-2 px-4 bg-[#ff0000] text-gray-50 rounded-full text-[15.25px] shadow-md hover:-translate-y-1 transition-all duration-300 font-medium font-nunito mt-8 "
            >
              Load more
            </button>
          </div>
        )}
      </section>
    </>
  );
};

export default Catalog;
