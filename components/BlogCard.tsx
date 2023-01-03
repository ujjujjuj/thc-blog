import { Blog, Prisma } from "@prisma/client";
import { NextPage } from "next";
import Image from "next/image";
import { FaRegUserCircle } from "react-icons/fa";
import shimmerUrl from "../utils/shimmerUrl";
import getFormattedDate from "../utils/getFormattedDate";
import getDescription from "../utils/getDescription";
import Router from "next/router";

type BlogWithAuthor = Prisma.BlogGetPayload<{ include: { author: true } }>;
interface BlogCardProps {
  blog: BlogWithAuthor;
}

const BlogCard: NextPage<BlogCardProps> = ({ blog }) => {
  return (
    <div
      className="w-[80vw] sm:w-96 lg:pr-16 lg:border-r-2 border-gray-300 transition-transform cursor-pointer hover:scale-hover"
      onClick={() => Router.push(`/blog/${blog.slug}`)}
    >
      <div className="relative w-full h-40">
        <Image
          src="/blog1.png"
          alt="blog image"
          layout="fill"
          objectFit="cover"
          placeholder="blur"
          blurDataURL={shimmerUrl}
        />
      </div>
      <div className="flex flex-col gap-3 px-4 font-euclid">
        <span className="pt-4 font-bold text-gray-500">
          {getFormattedDate(blog.createdAt)}
        </span>
        <p className="text-2xl font-bold">{blog.title}</p>
        <p className="text-base font-light text-gray-600">
          {getDescription(blog.content)}
        </p>
        <div className="flex gap-2 items-center text-gray-600">
          <FaRegUserCircle />
          {blog.author.name}
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
