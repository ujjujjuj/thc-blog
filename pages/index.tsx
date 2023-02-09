import type { GetServerSideProps, NextPage } from "next";
import Image from "next/image";
import Nav from "../components/Nav";
import { FaRegUserCircle } from "react-icons/fa";
import OtherBlogs from "../components/OtherBlogs";
import Footer from "../components/Footer";
import CategorySelect from "../components/CategorySelect";
import { useEffect, useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import Router from "next/router";
import shimmerUrl from "../utils/shimmerUrl";
import useWindowWidth from "../hooks/useWindowWidth";
import getTopBlogs from "../utils/getTopBlogs";
import getDescription from "../utils/getDescription";
import BlogCard from "../components/BlogCard";
import Head from "next/head";
import axios from "axios";
import getFormattedDate from "../utils/getFormattedDate";

const categories = [
  "Travel",
  "Comic",
  "Fashion",
  "College Life",
  "Technology",
  "Relationship",
  "Love",
  "Political",
];

interface HomeProps {
  topBlogs: any;
}

const Home: NextPage<HomeProps> = ({ topBlogs }) => {
  const topBlog = topBlogs[0];
  topBlogs = topBlogs.slice(1);
  const [cat, setCat] = useState(0);
  const width = useWindowWidth();

  const [currentPage, setCurrentPage] = useState(0);
  const [numPages, setNumPages] = useState(5);
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const abortController = new AbortController();
    const category = cat === 0 ? "All" : categories[cat - 1];
    axios
      .post(
        "/api/blog/all",
        { category: category, page: currentPage },
        { signal: abortController.signal }
      )
      .then((res) => {
        setBlogs(res.data.blogs);
        setNumPages(Math.ceil(res.data.totalBlogs / 6));
      })
      .catch((e) => {
        if (e.name !== "CanceledError") {
          throw e;
        }
      });

    return () => {
      abortController.abort();
    };
  }, [currentPage, cat]);

  return (
    <>
      <Head>
        <title>Blogs | THC</title>
      </Head>
      <Nav />
      <div className="flex flex-col items-center px-5 py-8 w-full md:px-10">
        <div className="mb-8 w-full text-center border-b-2 border-gray-800">
          <h1 className="font-poppins font-black text-[16vw] md:text-9xl pb-4 ">
            THC BLOG
          </h1>
        </div>
        <div className="flex flex-col gap-20 w-full lg:flex-row font-euclid">
          <div
            className="flex-[2] transition-transform cursor-pointer hover:scale-hover"
            onClick={() => Router.push(`/blog/${topBlog.slug}`)}
          >
            <div className="relative h-80 md:h-[32rem]">
              <Image
                src={topBlog.coverImage}
                alt={topBlog.slug}
                layout="fill"
                objectFit="cover"
                placeholder="blur"
                blurDataURL={shimmerUrl}
              />
            </div>
            <div className="flex justify-between pt-6 w-full text-gray-600">
              <span>{getFormattedDate(topBlog.createdAt)}</span>
              <div className="flex gap-2 items-center">
                <FaRegUserCircle />
                {topBlog.author.name}
              </div>
            </div>
            <div className="pt-5 mb-5">
              <p className="text-3xl font-bold md:text-5xl">{topBlog.title} </p>
              <p className="pt-5 text-lg font-medium text-gray-400">
                {getDescription(topBlog.content)}
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
            {topBlogs.map((topBlog: any, idx: any) => (
              <OtherBlogs key={idx} blog={topBlog} />
            ))}
          </div>
        </div>
      </div>
      <div className="flex flex-col px-5 py-4 text-black bg-white lg:gap-12 md:py-12 lg:flex-row md:px-10">
        <div className="col-span-2">
          <CategorySelect
            categories={categories}
            selected={cat}
            onChange={setCat as () => void}
          />
        </div>
        <div className="flex flex-wrap flex-1 col-span-3 gap-12 justify-center items-center">
          {blogs.map((blog: any, idx: number) => (
            <BlogCard key={idx} blog={blog} />
          ))}
        </div>
      </div>
      <div className="flex justify-center items-center px-5 py-4 text-black bg-white md:py-12 lg:flex-row md:px-10">
        <button className="px-2 py-2 text-gray-400 rounded-full transition-colors hover:bg-gray-200">
          <FiChevronLeft />
        </button>
        {Array.from({ length: numPages }).map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentPage(idx)}
            className={`px-4 py-2 rounded-full hover:bg-gray-200 transition-colors ${
              currentPage === idx ? "text-black" : "text-gray-400"
            }`}
          >
            {idx + 1}
          </button>
        ))}
        <button className="px-2 py-2 text-gray-400 rounded-full transition-colors hover:bg-gray-200">
          <FiChevronRight />
        </button>
      </div>

      <Footer />
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const topBlogs = await getTopBlogs();
  return { props: { topBlogs: JSON.parse(JSON.stringify(topBlogs)) } };
};

export default Home;
