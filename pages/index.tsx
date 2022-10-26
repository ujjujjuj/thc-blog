import type { NextPage } from "next";
import Image from "next/image";
import Nav from "../components/Nav";
import { FaRegUserCircle } from "react-icons/fa";
import OtherBlogs from "../components/OtherBlogs";
import Footer from "../components/Footer";
import CategorySelect from "../components/CategorySelect";
import { useState } from "react";
import BlogCard from "../components/BlogCard";
import Router from "next/router";
import shimmerUrl from "../utils/shimmerUrl";
import useWindowWidth from "../hooks/useWindowWidth";
import { current } from "@reduxjs/toolkit";

const categories = [
  "Travel",
  "Comic",
  "Fashion",
  "College Life",
  "Technology",
  "Relationship",
  "Love",
];
const categblogs = [
  0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
  22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40,
  41, 42, 43, 44, 45, 46,
];

const Home: NextPage = () => {
  const [cat, setCat] = useState(0);
  const width = useWindowWidth();

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsperPage, setItemsperPage] = useState(6);
  const [pageNumberLimit, setPageNumberLimit] = useState(5);
  const [maxpageNumberLimit, setMaxPageNumberLimit] = useState(5);
  const [minpageNumberLimit, setMinPageNumberLimit] = useState(0);
  const pages = [];

  const handleClick = (e: any) => {
    setCurrentPage(Number(e.target.id));
    console.log(Number(e.target.id));
  };

  const handleNextButton = () => {
    if (currentPage != pages.length) {
      setCurrentPage(currentPage + 1);
    }

    if (currentPage + 1 > maxpageNumberLimit && currentPage != pages.length) {
      setMaxPageNumberLimit(maxpageNumberLimit + pageNumberLimit);
      setMinPageNumberLimit(minpageNumberLimit + pageNumberLimit);
    }
  };

  const handlePrevButton = () => {
    if (currentPage != 1) {
      setCurrentPage(currentPage - 1);
    }

    if ((currentPage - 1) % pageNumberLimit == 0 && currentPage != 1) {
      setMaxPageNumberLimit(maxpageNumberLimit - pageNumberLimit);
      setMinPageNumberLimit(minpageNumberLimit + -pageNumberLimit);
    }
  };

  for (let i = 1; i <= Math.ceil(categblogs.length / itemsperPage); i++) {
    pages.push(i);
  }

  const indexoflastItem = currentPage * itemsperPage;
  const indexoffirstItem = indexoflastItem - itemsperPage;
  const currentItems = categblogs.slice(
    indexoffirstItem,
    indexoflastItem < categblogs.length ? indexoflastItem : categblogs.length
  );

  const renderPageNumbers = pages.map((number) => {
    if (number < maxpageNumberLimit + 1 && number > minpageNumberLimit) {
      return (
        <>
          <li key={number}>
            <button
              onClick={(e) => handleClick(e)}
              className={`${
                currentPage === number ? "bg-[#F1F5F9]" : "bg-white"
              } w-10 h-10 text-gray-800 transition-colors duration-150 rounded-full focus:shadow-outline active:bg-slate-300 hover:bg-indigo-100`}
            >
              <p id={number.toString()} className="font-poppins font-bold">
                {number}
              </p>
            </button>
          </li>
        </>
      );
    } else {
      return null;
    }
  });

  return (
    <>
      <Nav />
      <div className="flex flex-col items-center px-5 py-8 w-full md:px-10">
        <div className="mb-8 w-full text-center border-b-2 border-gray-800">
          <h1 className="font-poppins font-black text-[16vw] md:text-9xl pb-4 ">
            THC BLOG
            {/* <div className="my-8 w-full h-px bg-gray-800"></div> */}
          </h1>
        </div>
        <div className="flex flex-col gap-20 w-full lg:flex-row font-euclid">
          <div
            className="flex-1 transition-transform cursor-pointer hover:scale-hover"
            onClick={() => Router.push("/blog/blog-text-slug")}
          >
            <div className="relative h-80 md:h-[32rem]">
              <Image
                src="/blog1.png"
                alt="blog1"
                layout="fill"
                objectFit="cover"
                placeholder="blur"
                blurDataURL={shimmerUrl}
              />
            </div>
            <div className="flex justify-between pt-6 w-full text-gray-600">
              <span>October 18, 2022</span>
              <div className="flex gap-2 items-center">
                <FaRegUserCircle />
                Ujjwal Dimri
              </div>
            </div>
            <div className="pt-5">
              <p className="text-3xl font-bold md:text-5xl">
                This is the title of your Blog Cover Story
              </p>
              <p className="pt-5 text-lg font-medium text-gray-400">
                The Blog Description or thrity words something of random
                gibbrish i don&nbsp;t know man but just something here
              </p>
            </div>
          </div>
          <div className="flex flex-col flex-1 gap-10">
            <h3
              className={`text-3xl font-bold font-poppins right-0 ${
                width >= 1024 ? "" : "text-center"
              }	`}
            >
              Trending Right Now
            </h3>
            <OtherBlogs />
            <OtherBlogs />
            <OtherBlogs />
          </div>
        </div>
      </div>
      <div className="flex flex-col  px-5 py-4 text-black bg-white lg:gap-12 md:py-12 lg:flex-row md:px-10">
        <div className="col-span-2">
          <CategorySelect
            categories={categories}
            selected={cat}
            onChange={setCat as () => void}
          />
        </div>
        <div className=" col-span-3 flex flex-wrap flex-1 gap-12 justify-center items-center">
          {currentItems.map((e) => {
            return <BlogCard />;
          })}
        </div>
      </div>
      <div className="flex flex-col  px-5 py-4 text-black bg-white justify-center items-center lg:gap-12 md:py-12 lg:flex-row md:px-10 ">
        <ul className="inline-flex space-x-2 lg:ml-[15rem]">
          <li>
            <button
              onClick={handlePrevButton}
              className="flex items-center justify-center w-10 h-10 text-gray-800 transition-colors duration-150 rounded-full focus:shadow-outline hover:bg-indigo-100"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                <path
                  d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                  clipRule="evenodd"
                  fillRule="evenodd"
                ></path>
              </svg>
            </button>
          </li>
          {renderPageNumbers}
          <li>
            <button
              onClick={handleNextButton}
              className="flex items-center justify-center w-10 h-10 text-gray-800 transition-colors duration-150 bg-white rounded-full focus:shadow-outline hover:bg-indigo-100"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                <path
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                  fillRule="evenodd"
                ></path>
              </svg>
            </button>
          </li>
        </ul>
      </div>

      <Footer />
    </>
  );
};

export default Home;
