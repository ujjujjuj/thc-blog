import AdminNav from "../../components/AdminNav";
import { useState, useEffect, useRef, SyntheticEvent } from "react";
import Checkbox from "../../components/Checkbox";
import Input from "../../components/Input";
import { useRouter } from "next/router";

const EditBlog = () => {
  const [content, setContent] = useState("");
  const [publish, setPublish] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const router = useRouter();

  useEffect(() => {
    console.log(content);
  }, [content]);

  const saveChanges = (e: SyntheticEvent) => {
    e.preventDefault();
  };

  return (
    <>
      <AdminNav />
      <form onSubmit={saveChanges} ref={formRef}>
        <div className="px-10 py-4">
          <div className="pb-5 max-w-2xl">
            <Input name="Title" type="text" placeholder="Enter Blog Title" />
          </div>
          <textarea
            name="content"
            className="p-2 w-full text-black min-h-[12rem]"
            placeholder="Enter content here..."
          ></textarea>
          <input type="file" accept="image/*" name="image" />
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

export default EditBlog;
