import AdminNav from "../../components/AdminNav";
import BlogEditor from "../../components/BlogEditor";
import { useState, useEffect } from "react";
import Checkbox from "../../components/Checkbox";
import Input from "../../components/Input";
import { useRouter } from "next/router";

const EditBlog = () => {
  const [content, setContent] = useState("");
  const [publish, setPublish] = useState(false);
  const router = useRouter();

  useEffect(() => {
    console.log(content);
  }, [content]);

  const saveChanges = () => {};

  return (
    <>
      <AdminNav />
      <div className="py-4 px-10">
        <div className="pb-5 max-w-md">
          <Input name="Title" type="text" placeholder="Enter Blog Title" />
        </div>
        <BlogEditor
          content={content}
          setContent={setContent}
          blogId={router.query.id as string}
        />
        <div className="my-3">
          <Checkbox
            name="Publish"
            value={publish}
            onChange={() => setPublish(!publish)}
          />
        </div>
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
          onClick={saveChanges}
        >
          Save Changes
        </button>
      </div>
    </>
  );
};

export default EditBlog;
