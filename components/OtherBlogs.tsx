import { Blog } from "@prisma/client";
import Image from "next/image";
import Router from "next/router";
import { FC } from "react";
import { FaRegUserCircle } from "react-icons/fa";
import shimmerUrl from "../utils/shimmerUrl";
import getFormattedDate from "../utils/getFormattedDate";

interface OtherBlogsProps {
  blog: any;
}

const OtherBlogs: FC<OtherBlogsProps> = ({ blog }) => {
  return (
    <div
      className="pb-10 font-bold border-b-2 border-gray-800 transition-transform cursor-pointer hover:scale-hover"
      onClick={() => Router.push(`/blog/${blog.slug}`)}
    >
      <div className="flex gap-8 items-stretch w-full">
        <div className="relative w-4/12">
          <Image
            src={blog.coverImage}
            alt={blog.slug}
            layout="fill"
            objectFit="cover"
            placeholder="blur"
            blurDataURL={shimmerUrl}
          />
        </div>
        <div className="flex flex-col flex-1 gap-4">
          <span className="text-gray-600">
            {getFormattedDate(blog.createdAt)}
          </span>
          <span className="text-xl md:text-2xl">{blog.title}</span>
          <div className="flex gap-2 items-center text-gray-600">
            <FaRegUserCircle />
            {blog.author.name}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OtherBlogs;
