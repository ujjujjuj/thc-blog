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

const categories = [
  "Travel",
  "Comic",
  "Fashion",
  "College Life",
  "Technology",
  "Relationship",
  "Love",
];

const Home: NextPage = () => {
  const [cat, setCat] = useState(0);

  return (
    <>
      <Nav />
      <div className="flex flex-col items-center px-5 py-8 w-full md:px-10">
        <div className="mb-8 w-full text-center border-b-2 border-gray-800">
          <h1 className="font-poppins font-black text-[16vw] md:text-9xl pb-4">
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
            <OtherBlogs />
            <OtherBlogs />
            <OtherBlogs />
            <OtherBlogs />
          </div>
        </div>
      </div>
      <div className="flex flex-col px-5 py-4 text-black bg-white lg:gap-12 md:py-12 lg:flex-row md:px-10">
        <div className="">
          <CategorySelect
            categories={categories}
            selected={cat}
            onChange={setCat as () => void}
          />
        </div>
        <div className="flex flex-wrap flex-1 gap-12 justify-center items-center">
          <BlogCard />
          <BlogCard />
          <BlogCard />
          <BlogCard />
          <BlogCard />
          <BlogCard />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Home;
