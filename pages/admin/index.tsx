import AdminNav from "../../components/AdminNav";
import Router from "next/router";
import axios from "axios";
import { toast } from "react-toastify";
import ConfirmationModal from "../../components/ConfirmationModal";
import { useState } from "react";

const Admin = () => {
  const [modalOpen, setModalOpen] = useState(false);

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
      </div>
    </>
  );
};

export default Admin;
