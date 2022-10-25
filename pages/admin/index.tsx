import AdminNav from "../../components/AdminNav";
import Router from "next/router";
import axios from "axios";
import { toast } from "react-toastify";
import ConfirmationModal from "../../components/ConfirmationModal";
import { useState } from "react";
import { GetServerSideProps } from "next";
import addAuth from "../../utils/addAuth";
import { Blog } from "@prisma/client";
import { FC } from "react";
import { IoMdDoneAll } from "react-icons/io";

import Image from "next/image";

interface AdminHomeProps {
  blogs: Array<any>;
}

const Admin: FC<AdminHomeProps> = ({ blogs }) => {
  const [modalOpen, setModalOpen] = useState(false);
  console.log(blogs);

  const newBlog = () => {
    axios
      .post("/api/blog/new")
      .then((res) => {
        Router.push(`/admin/editblog?id=${res.data.id}`);
      })
      .catch((e) => {
        console.error(e);
        toast.error("Server error");
      });
  };

  return (
    <>
      <AdminNav />
      {modalOpen ? (
        <ConfirmationModal
          onConfirm={newBlog}
          onReject={() => setModalOpen(false)}
        />
      ) : null}
      <div className="px-10 py-4 my-4">
        <div className="flex gap-5 justify-between">
          <div className="flex">
            <span className="text-5xl font-poppins font-black">Your Blogs</span>
          </div>
          {/* <button
            className="px-4 py-2 font-semibold text-white bg-blue-700 rounded hover:bg-blue-600"
            onClick={() => setModalOpen(true)}
          >
            New Blog
          </button> */}

          <div className="flex">
            <button
              onClick={() => setModalOpen(true)}
              className="select-none cursor-pointer rounded-lg border-2 border-gray-200
   py-3 px-6 font-bold text-gray-200 transition-colors duration-200 ease-in-out hover:bg-gray-200 hover:text-gray-900 hover:border-gray-200 	"
            >
              Create Blog
            </button>
          </div>
        </div>
        <div className="flex row  mt-12 text-xl font-medium text-slate-300	 font-poppins justify-center md:justify-start">
          <p className="mx-3"> Published blogs</p> <IoMdDoneAll />
        </div>
        <div className="flex flex-wrap gap-8 items-center my-8">
          {blogs
            .filter((blog) => blog.published)
            .map((blog, idx) => (
              <div
                className=" w-full md:w-[30%] xl:w-[30%] px-4  h-[32em] "
                key={idx}
              >
                <div className="bg-white rounded-lg overflow-hidden mb-10 h-[32rem]">
                  <div className="relative h-72">
                    <Image
                      src={blog.coverImage}
                      alt={blog.title}
                      layout="fill"
                      objectFit="cover"
                    />
                  </div>
                  <div className="p-8 sm:p-9 md:p-7 xl:p-9 text-center">
                    <h3>
                      <a
                        href="javascript:void(0)"
                        className="
                        font-semibold
                        text-dark text-xl
                        sm:text-[22px]
                        md:text-xl
                        lg:text-[22px]
                        xl:text-xl
                        2xl:text-[22px]
                        mb-4
                        block
                        hover:text-primary
                        "
                      >
                        {blog.title}
                      </a>
                    </h3>
                    <p className="text-base text-slate-500	 leading-relaxed mb-7 truncate whitespace-[break-spaces]">
                      {blog.content}
                    </p>
                    <a
                      href="javascript:void(0)"
                      className="
                     inline-block
                     py-2
                     px-7
                     border border-[#E5E7EB]
                     rounded-full
                     text-base text-slate-500	
                     font-medium
                     hover:border-primary hover:bg-primary hover:text-black
                     transition
                     "
                      onClick={() =>
                        Router.push(`/admin/editblog?id=${blog.id}`)
                      }
                    >
                      Update Blog
                    </a>
                  </div>
                </div>
              </div>
            ))}
        </div>
        <div className="mt-12 text-xl font-medium text-slate-300	 font-poppins justify-center md:justify-start">
          <p> Unpublished blogs</p>
        </div>
        <div className="flex flex-wrap gap-8 items-center my-8">
          {blogs
            .filter((blog) => !blog.published)
            .map((blog, idx) => (
              <div
                className=" w-full md:w-[30%] xl:w-[30%] px-4  h-[32em] "
                key={idx}
              >
                <div className="bg-white rounded-lg overflow-hidden mb-10 h-[32rem]">
                  <div className="relative h-72">
                    <Image
                      src={blog.coverImage}
                      alt={blog.title}
                      layout="fill"
                      objectFit="cover"
                    />
                  </div>
                  <div className="p-8 sm:p-9 md:p-7 xl:p-9 text-center">
                    <h3>
                      <a
                        href="javascript:void(0)"
                        className="
                        font-semibold
                        text-dark text-xl
                        sm:text-[22px]
                        md:text-xl
                        lg:text-[22px]
                        xl:text-xl
                        2xl:text-[22px]
                        mb-4
                        block
                        hover:text-primary
                        "
                      >
                        {blog.title}
                      </a>
                    </h3>
                    <p className="text-base text-slate-500	 leading-relaxed mb-7 truncate whitespace-[break-spaces]">
                      {blog.content}
                    </p>
                    <a
                      href="javascript:void(0)"
                      className="
                     inline-block
                     py-2
                     px-7
                     border border-[#E5E7EB]
                     rounded-full
                     text-base text-slate-500	
                     font-medium
                     hover:border-primary hover:bg-primary hover:text-black
                     transition
                     "
                      onClick={() =>
                        Router.push(`/admin/editblog?id=${blog.id}`)
                      }
                    >
                      Finish Blog
                    </a>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const user = await addAuth(req, res);
  if (user === null) {
    return { redirect: { statusCode: 302, destination: "/admin/login" } };
  }

  let blogs: Blog[] = [];
  if (user.id === 1) {
    blogs = (await prisma?.blog.findMany()) ?? [];
  } else {
    blogs =
      (await prisma?.blog.findMany({ where: { authorId: user.id } })) ?? [];
  }

  return { props: { blogs: JSON.parse(JSON.stringify(blogs)) } };
};

export default Admin;
