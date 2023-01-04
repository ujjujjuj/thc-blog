import { useRouter } from "next/router";
import Footer from "../../components/Footer";
import Nav from "../../components/Nav";
import Image from "next/image";
import { FaRegUserCircle } from "react-icons/fa";
import OtherBlogs from "../../components/OtherBlogs";
import useWindowWidth, { LG } from "../../hooks/useWindowWidth";
import { GetServerSideProps } from "next";
import { FC } from "react";
import { prisma } from "../../prisma/db";
import Blog from "../../components/Blog";
import getTopBlogs from "../../utils/getTopBlogs";
import { Blog as BlogType } from "@prisma/client";
import Head from "next/head";
import getDescription from "../../utils/getDescription";

interface BlogViewProps {
  blog: any;
  topBlogs: BlogType[];
}

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const BlogView: FC<BlogViewProps> = ({ blog, topBlogs }) => {
  const width = useWindowWidth();
  const blogDate = new Date(blog.createdAt);

  return (
    <>
      <Head>
        <title>{blog.title}</title>
        <meta property="og:title" content={blog.title} />
        <meta
          property="og:description"
          content={getDescription(blog.content)}
        />
        <meta property="og:type" content="article" />
        <meta
          property="og:image"
          itemProp="image"
          content={"https://blog.thcplus.in" + blog.coverImage}
        />
        <meta property="og:site_name" content="THC - The Hiking Club"></meta>
      </Head>
      <Nav />
      <div className="px-5 py-8 md:px-10">
        <div className="flex gap-20 w-full font-euclid">
          <div className="flex-[2]">
            <div className="relative h-80 md:h-[32rem]">
              <Image
                src={blog.coverImage}
                alt={blog.title}
                layout="fill"
                objectFit="cover"
              />
            </div>
            <div className="flex justify-between pt-6 w-full text-gray-600">
              <span>
                {`${
                  months[blogDate.getMonth()]
                } ${blogDate.getDate()}, ${blogDate.getFullYear()}`}{" "}
              </span>
              <div className="flex gap-2 items-center">
                <FaRegUserCircle />
                {blog.author.name}
              </div>
            </div>
            <div className="py-12 font-euclid">
              <span className="py-3 text-5xl font-bold">{blog.title}</span>
              {/* <br /> <br /> */}
              <div className="mt-5">
                <Blog content={blog.content} />
              </div>
              {/* <p className="my-4 mt-4 text-lg text-gray-400 whitespace-pre-line font-small">
                {blog.content}
              </p> */}
              <p className="mt-6 font-bold">Authored by: {blog.author.name}</p>
            </div>
          </div>
          {width >= LG ? (
            <>
              <div className="flex flex-col flex-1 gap-10">
                <p className="text-3xl font-bold font-euclid">
                  Editor picks just for you
                </p>
                {topBlogs.map((topBlog, idx) => (
                  <OtherBlogs key={idx} blog={topBlog} />
                ))}
              </div>
            </>
          ) : null}
        </div>

        {width < LG ? (
          <>
            <div className="flex flex-col gap-10">
              <p className="text-3xl font-bold font-euclid">
                Editor picks just for you
              </p>
              {topBlogs.map((topBlog, idx) => (
                <OtherBlogs key={idx} blog={topBlog} />
              ))}
            </div>
          </>
        ) : null}
      </div>

      <Footer />
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({
  req,
  res,
  query,
}) => {
  if (typeof query.slug == "object" || query.slug === undefined) {
    return { redirect: { statusCode: 301, destination: "/" } };
  }

  let blog = await prisma?.blog.findUnique({
    where: { slug: query.slug },
    include: { author: { select: { name: true } } },
  });
  if (!blog) return { notFound: true };
  const topBlogs = await getTopBlogs(2, blog.id);

  prisma.blog
    .update({
      where: { id: blog.id },
      data: { clicks: { increment: 1 } },
    })
    .then(); // TOODO: figure out why increment doesn't work without .then()
  return {
    props: {
      blog: JSON.parse(JSON.stringify(blog)),
      topBlogs: JSON.parse(JSON.stringify(topBlogs)),
    },
  };
};

export default BlogView;
