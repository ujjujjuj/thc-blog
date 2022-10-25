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
      <div className="flex gap-5 px-10 pt-4">
        <button
          className="px-4 py-2 font-semibold text-white bg-blue-700 rounded hover:bg-blue-600"
          onClick={() => Router.back()}
        >
          <IoArrowBackSharp />
        </button>
        <span className="text-3xl">Blogs</span>
      </div>
      <form onSubmit={saveChanges} ref={formRef}>
        <div className="flex flex-col gap-4 items-start px-10 py-4">
          <input
            name="title"
            type="text"
            placeholder="Enter Blog Title"
            defaultValue={blog.title}
            className="p-2 w-full max-w-xl text-black"
          />

          <textarea
            name="content"
            className="p-2 w-full text-black min-h-[12rem]"
            placeholder="Enter content here..."
            defaultValue={blog.content}
          ></textarea>
          <input
            name="priority"
            type="number"
            placeholder="Priority (higher is better)"
            className="p-2 text-black"
            defaultValue={blog.priority}
          />

          <input
            name="coverImage"
            type="file"
            placeholder="Enter Blog Title"
            accept="image/*"
          />
          <div className="my-3">
            <Checkbox
              name="Publish"
              value={publish}
              onChange={() => setPublish(!publish)}
            />
          </div>
          <button className="px-4 py-2 font-semibold text-white bg-blue-600 rounded hover:bg-blue-700">
            Save Changes
          </button>
        </div>
      </form>
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
