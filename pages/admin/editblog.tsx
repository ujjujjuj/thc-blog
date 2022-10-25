import AdminNav from "../../components/AdminNav";
import { useState, useEffect, useRef, SyntheticEvent } from "react";
import Checkbox from "../../components/Checkbox";
import axios from "axios";
import { toast } from "react-toastify";
import { GetServerSideProps } from "next";
import addAuth from "../../utils/addAuth";
import { FC } from "react";
import { useRouter } from "next/router";
import { IoArrowBackSharp } from "react-icons/io5";
import Router from "next/router";

interface EditBlogProps {
  blog: any;
}

const EditBlog: FC<EditBlogProps> = ({ blog }) => {
  const [publish, setPublish] = useState(blog.published);
  const formRef = useRef<HTMLFormElement>(null);
  const router = useRouter();

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
      .then((res) => {
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
      <div className="mt-5 flex gap-5 px-10 pt-4">
        <button
          className="px-4 py-2 font-semibold text-white bg-emerald-700 rounded hover:bg-emerald-800"
          onClick={() => Router.back()}
        >
          <IoArrowBackSharp />
        </button>
        <span className="text-3xl font-poppins font-bold">
          Edit Your Blog Here
        </span>
      </div>

      <div className="flex items-center justify-center p-12">
        <div className="mx-auto w-full max-w-[1000px] bg-teal-50 rounded-md	">
          <form onSubmit={saveChanges} ref={formRef} className="py-6 px-9">
            <div className="mb-5">
              <label className="mb-3 block font-poppins font-bold text-xl text-[#07074D]">
                Title
              </label>
              <input
                name="title"
                type="text"
                placeholder="Enter Blog Title"
                defaultValue={blog.title}
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
                defaultValue={blog.content}
              ></textarea>
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
            <div className="mb-6 pt-4">
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
                className="hover:shadow-form w-full rounded-md bg-emerald-700 py-3 px-8 text-center text-base font-semibold text-white outline-none"
              >
                Save Changes
              </button>
            </div>
          </form>
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

  if (user.id === 1 || blog.authorId === user.id) {
    return { props: { blog: JSON.parse(JSON.stringify(blog)) } };
  } else {
    return { redirect: { statusCode: 302, destination: "/401" } };
  }
};

export default EditBlog;
