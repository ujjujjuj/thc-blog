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

interface BlogProps {
  blog: any;
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

const Blog: FC<BlogProps> = ({ blog }) => {
  const router = useRouter();
  const width = useWindowWidth();
  console.log(blog);
  const blogDate = new Date(blog.createdAt);

  return (
    <>
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
              <span className="text-5xl font-bold">{blog.title}</span>
              <p className="my-4 mt-4 text-lg font-small  text-gray-400 whitespace-pre-line">
                {blog.content}
              </p>
              <p className="mt-6 font-bold">Authored by: {blog.author.name}</p>
            </div>
          </div>
          {width >= LG ? (
            <>
              <div className="flex flex-col flex-1 gap-10">
                <p className="text-3xl font-bold font-euclid">
                  Editor picks just for you
                </p>
                <OtherBlogs />
                <OtherBlogs />
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
              <OtherBlogs />
              <OtherBlogs />
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

  return { props: { blog: JSON.parse(JSON.stringify(blog)) } };
};

export default Blog;
