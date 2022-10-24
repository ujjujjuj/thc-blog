import React, { useRef, FC, useEffect, useMemo, useState } from "react";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import { toast } from "react-toastify";
// const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
const ReactQuill = dynamic(
  async () => {
    const { default: RQ } = await import("react-quill");
    const _reactQuill = ({ forwardedRef, ...props }) => <RQ ref={forwardedRef} {...props} /> 
    return _reactQuill;
  },
  {
    ssr: false
  }
);

interface BlogEditorProps {
  content: string;
  setContent: (content: string) => void;
  blogId?: string;
}

const BlogEditor: FC<BlogEditorProps> = ({ content, setContent, blogId }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const quillRef = useRef(null);
  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          [{ header: [1, 2, 3, false] }],
          ["bold", "italic", "underline"],
          [{ list: "ordered" }, { list: "bullet" }],
          ["image", "link"],
        ],
        handlers: {
          image: () => inputRef.current !== null && inputRef.current.click(),
        },
      },
    }),
    []
  );

  const uploadImage = () => {
    if (
      inputRef.current !== null &&
      inputRef.current.files !== null &&
      inputRef.current.files.length > 0
    ) {
      const formData = new FormData();
      formData.append("image", inputRef.current.files[0]);
      formData.append("blogId", blogId || "");
      axios
        .post("/api/image/upload", formData)
        .then((res) => {
          if (quillRef.current === null) return;
          console.log(quillRef.current);

          const editor = quillRef.current.getEditor();
          editor.current.insertEmbed(
            editor.current.getSelection(),
            "image",
            `/uploads/${res.data.id}`
          );
          toast.success("Image uploaded");
        })
        .catch((e) => {
          console.error(e);
          toast.error("Failed to upload image");
        });
    }
  };

  return (
    <>   Block name
    $ B.filter (/= '\0')+
      <input
        type="file"
        name="image"
        ref={inputRef}
        className="hidden"
        onChange={uploadImage}
        accept="image/*"
      />
      {/* <form className="hidden" >
      </form> */}
      <ReactQuill
        ref={quillRef}
        value={content}
        onChange={setContent}
        modules={modules}
        placeholder="Enter blog content here..."
      />
    </>
  );
};

export default BlogEditor;
