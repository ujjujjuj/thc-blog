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
      <div className="px-10 py-4">
        <div className="flex gap-5">
          <span className="text-3xl">Blogs</span>
          <button
            className="px-4 py-2 font-semibold text-white bg-blue-700 rounded hover:bg-blue-600"
            onClick={() => setModalOpen(true)}
          >
            New Blog
          </button>
        </div>
        <div className="mt-6 text-xl font-bold font-poppins">
          Published blogs
        </div>
        <div className="flex flex-wrap gap-8 items-center my-8">
          {blogs
            .filter((blog) => blog.published)
            .map((blog, idx) => (
              <div
                key={idx}
                className="flex flex-col flex-nowrap p-4 h-[32rem] w-full max-w-sm bg-gray-700 rounded-md transition-transform cursor-pointer hover:scale-hover"
                onClick={() => Router.push(`/admin/editblog?id=${blog.id}`)}
              >
                <div className="relative h-72">
                  <Image
                    src={blog.coverImage}
                    alt={blog.title}
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
                <p className="mt-4 text-2xl font-bold text-center font-poppins">
                  {blog.title}
                </p>
                <div className="flex-1 mt-4 text-sm truncate whitespace-[break-spaces] font-poppins">
                  {blog.content}
                </div>
              </div>
            ))}
        </div>
        <div className="mt-6 text-xl font-bold font-poppins">
          Unpublished blogs
        </div>
        <div className="flex flex-wrap gap-8 items-center my-8">
          {blogs
            .filter((blog) => !blog.published)
            .map((blog, idx) => (
              <div
                key={idx}
                className="flex flex-col flex-nowrap p-4 h-[32rem] w-full max-w-sm bg-gray-700 rounded-md transition-transform cursor-pointer hover:scale-hover"
                onClick={() => Router.push(`/admin/editblog?id=${blog.id}`)}
              >
                <div className="relative h-72">
                  <Image
                    src={blog.coverImage}
                    alt={blog.slug}
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
                <p className="mt-4 text-2xl font-bold text-center font-poppins">
                  {blog.title}
                </p>
                <div className="flex-1 mt-4 text-sm truncate whitespace-[break-spaces] font-poppins">
                  {blog.content}
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
