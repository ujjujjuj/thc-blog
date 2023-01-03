import AdminNav from "../../components/AdminNav";
import { useState, useRef, SyntheticEvent } from "react";
import Checkbox from "../../components/Checkbox";
import axios from "axios";
import { toast } from "react-toastify";
import { GetServerSideProps } from "next";
import addAuth from "../../utils/addAuth";
import { FC } from "react";
import { useRouter } from "next/router";
import ConfirmationModal from "../../components/ConfirmationModal";
import { prisma } from "../../prisma/db";

import { IoArrowBackSharp } from "react-icons/io5";
import Router from "next/router";
import { Category } from "@prisma/client";
import Blog from "../../components/Blog";

interface EditBlogProps {
  blog: any;
  categories: Category[];
}

const EditBlog: FC<EditBlogProps> = ({ blog, categories }) => {
  const [publish, setPublish] = useState(blog.published);
  const [modalOpen, setModalOpen] = useState(false);
  const [md, setMd] = useState(blog.content);
  const [title, setTitle] = useState(blog.title);

  const formRef = useRef<HTMLFormElement>(null);
  const router = useRouter();

  const deleteBlog = () => {
    const blogId =
      typeof router.query.id === "object" || router.query.id === undefined
        ? "0"
        : router.query.id;
    axios
      .post("/api/blog/delete", { id: blogId })
      .then(() => {
        toast.success("Blog deleted successfully");
        Router.back();
      })
      .catch((e) => {
        console.log(e);
        toast.error("Server error.");
      });
  };

  const saveChanges = (e: SyntheticEvent) => {
    e.preventDefault();
    if (formRef.current === null) return;
    const formData = new FormData(formRef.current);
    const blogId =
      typeof router.query.id === "object" || router.query.id === undefined
        ? "0"
        : router.query.id;
    formData.append("blogId", blogId);
    formData.append("published", publish.toString());
    let file = formData.get("coverImage") as File;
    if (file.size === 0) {
      formData.delete("coverImage");
    }
    axios
      .post("/api/blog/save", formData)
      .then(() => {
        toast.success("Saved changes successfully");
      })
      .catch((e) => {
        console.log(e);
        toast.error("Server error.");
      });
  };

  return (
    <>
      <AdminNav />
      {modalOpen ? (
        <ConfirmationModal
          message="Are you sure you want to Delete this Blog?"
          onConfirm={deleteBlog}
          onReject={() => setModalOpen(false)}
        />
      ) : null}
      <div className="flex gap-5 justify-between px-10 pt-4 mt-5">
        <button
          className="px-4 py-2 font-semibold text-white bg-emerald-700 rounded hover:bg-emerald-800"
          onClick={() => Router.back()}
        >
          <IoArrowBackSharp />
        </button>
        <span className="text-3xl font-bold font-poppins">
          Edit Your Blog Here
        </span>
        <div className="flex">
          <button
            onClick={() => setModalOpen(true)}
            className="px-6 py-3 font-bold text-gray-200 bg-red-500 rounded-lg transition-colors duration-200 ease-in-out cursor-pointer select-none hover:bg-red-600 hover:text-gray-300"
          >
            DELETE
          </button>
        </div>
      </div>

      <div className="flex flex-col justify-center items-center p-12">
        <div className="mx-auto w-full max-w-[1000px] bg-teal-50 rounded-md	">
          <form onSubmit={saveChanges} ref={formRef} className="px-9 py-6">
            <div className="mb-5">
              <label className="mb-3 block font-poppins font-bold text-xl text-[#07074D]">
                Title
              </label>
              <input
                name="title"
                type="text"
                placeholder="Enter Blog Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-black outline-none focus:border-emerald-700 focus:shadow-md"
              />
            </div>
            <div className="mb-5">
              <label className="mb-3 block font-poppins font-bold text-xl text-[#07074D]">
                Content
              </label>

              <textarea
                name="content"
                className="w-full min-h-[20rem] rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-black outline-none focus:border-emerald-700 focus:shadow-md"
                placeholder="Enter content here..."
                value={md}
                onChange={(e) => setMd(e.target.value)}
              ></textarea>
            </div>
            <div className="mb-5">
              <label className="mb-3 block font-poppins font-bold text-xl text-[#07074D]">
                Category
              </label>
              <select
                id="countries"
                className="w-full md:w-1/2  rounded-md border border-[#e0e0e0] bg-white py-3 px-8 text-base font-medium text-black outline-none focus:border-emerald-700 focus:shadow-md"
                name="category"
                defaultValue={blog.categoryName}
              >
                {categories.map((category, idx) => {
                  return (
                    <option value={category.name} key={idx}>
                      {category.name}
                    </option>
                  );
                })}
              </select>
              {/* <input
                name="category"
                className="w-1/2  rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-black outline-none focus:border-emerald-700 focus:shadow-md"
                placeholder="Choose your Category"
                defaultValue={blog.content}
              ></input> */}
            </div>
            <div className="mb-5">
              <label className="mb-3 block font-poppins font-bold text-xl text-[#07074D]">
                Priority Number
              </label>
              <input
                name="priority"
                type="number"
                placeholder="Priority (higher is better)"
                className=" rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-black outline-none focus:border-emerald-700 focus:shadow-md"
                defaultValue={blog.priority}
              />
            </div>
            <div className="pt-4 mb-6">
              {/* <label className="mb-3 block font-poppins font-bold text-xl text-[#07074D]">
                Upload Cover Image
              </label> */}

              <div className="mb-8">
                <label className="relative flex min-h-[200px] items-center justify-center rounded-md border border-dashed border-[#e0e0e0] p-12 text-center">
                  <div>
                    <span className="mb-2 block text-xl font-semibold text-[#07074D]">
                      Drop or Select files
                    </span>
                  </div>
                  <input
                    name="coverImage"
                    type="file"
                    placeholder="Browse"
                    accept="image/*"
                    className="inline-flex rounded border border-[#e0e0e0] py-2 px-7 text-base font-medium text-[#07074D]"
                  />
                </label>
              </div>
            </div>
            <div className="mb-5">
              <label className="mb-3 block font-poppins font-bold text-xl text-[#07074D]">
                Publish ?
              </label>
              <div className="my-3">
                <Checkbox
                  name="Publish"
                  value={publish}
                  onChange={() => setPublish(!publish)}
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="px-8 py-3 w-full text-base font-semibold text-center text-white bg-emerald-700 rounded-md outline-none hover:shadow-form"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
        <div className="mt-8 w-full border-t-2 border-gray-800">
          <p className="mt-4 mb-2 text-5xl font-bold text-center">{title}</p>
          <div className="">
            <Blog content={md} />
          </div>
        </div>
      </div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({
  req,
  res,
  query,
}) => {
  const user = await addAuth(req, res);
  if (user === null) {
    return { redirect: { statusCode: 302, destination: "/admin/login" } };
  }

  if (typeof query.id == "object")
    return { redirect: { statusCode: 302, destination: "/admin/" } };

  let blogId = parseInt(query.id || "0");
  let blog = await prisma?.blog.findUnique({ where: { id: blogId } });
  if (!blog) return { redirect: { statusCode: 302, destination: "/admin/" } };

  const categories = await prisma?.category.findMany();

  if (user.id === 1 || blog.authorId === user.id) {
    return { props: { blog: JSON.parse(JSON.stringify(blog)), categories } };
  } else {
    return { redirect: { statusCode: 302, destination: "/401" } };
  }
};

export default EditBlog;
