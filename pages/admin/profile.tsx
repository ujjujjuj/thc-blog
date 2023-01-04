import AdminNav from "../../components/AdminNav";
import Image from "next/image";
import { FcInfo } from "react-icons/fc";
import addAuth from "../../utils/addAuth";
import { GetServerSideProps, NextPage } from "next";
import { User } from "@prisma/client";
import { prisma } from "../../prisma/db";
import { useEffect, useState } from "react";
import { SyntheticEvent } from "react-draft-wysiwyg";
import axios from "axios";
import { toast } from "react-toastify";
import { FiSave } from "react-icons/fi";
import { AiOutlineDelete } from "react-icons/ai";
import ConfirmationModal from "../../components/ConfirmationModal";
import { GrPowerReset } from "react-icons/gr";
import Head from "next/head";

interface ProfileProps {
  user: User;
  allUsers: { [key: string]: User };
}

const Profile: NextPage<ProfileProps> = ({ user, allUsers }) => {
  const [openModal, setOpenModal] = useState(false);
  const [users, setUsers] = useState(allUsers ?? []);
  const [deleteModal, setDeleteModal] = useState(false);

  const saveUser = (userData: any) => {
    console.log(userData);

    axios
      .post("/api/user/update", userData)
      .then((res) => {
        toast.success("User updated successfully");
        if (res.data) {
          setUsers((_users) => {
            let newUsers: any = {
              ..._users,
              [res.data.newId]: _users[res.data.oldId],
            };
            delete newUsers[res.data.oldId];
            return newUsers;
          });
        }
      })
      .catch((e) => {
        console.log(e);
        toast.error("Server error");
      });
  };

  const deleteUser = (id: any) => {
    if (id < 0) {
      setUsers((_users) => {
        delete _users[id];
        return { ..._users };
      });
      return;
    }
    axios
      .post("/api/user/delete", { id })
      .then((res) => {
        toast.success("User deleted successfully");
        setUsers((_users) => {
          delete _users[id];
          return { ..._users };
        });
      })
      .catch((e) => {
        console.log(e);
        toast.error("Server error");
      });
  };

  const resetUser = (id: any) => {
    if (id < 0) {
      toast.success("Password reset successfully");
    }
    axios
      .post("/api/user/reset", { id })
      .then((res) => {
        toast.success("Password reset successfully");
      })
      .catch((e) => {
        console.log(e);
        toast.error("Server error");
      });
  };

  const addUser = () => {
    setUsers((_users) => ({
      ..._users,
      [-1 * Math.floor(Math.random() * 100000)]: {
        name: "Name",
        email: "Email",
        password: "Password",
        role: "USER",
      },
    }));
  };

  return (
    <>
      
      <Head>
        <title>Profile | THC</title>
      </Head>
      <AdminNav />
      <div className="container mx-auto my-28">
        <div>
          <div className="relative pb-3 mx-auto w-11/12 max-w-5xl bg-white rounded-lg shadow">
            <div className="pt-4">
              <h1 className="text-3xl font-bold text-center text-gray-900">
                {user.name}
              </h1>
              <p className="text-sm font-medium text-center text-gray-400">
                {user.role === "ADMIN" ? "Administrator" : "Editor"}
              </p>
              <p>
                <span></span>
              </p>
              <div className="px-6 my-5">
                <button
                  className="block px-6 py-3 mx-auto font-medium leading-6 text-gray-200 bg-gray-900 rounded-lg hover:bg-black hover:text-white"
                  onClick={() => setOpenModal((_openModal) => !_openModal)}
                >
                  Update Your Profile
                </button>
              </div>
              {openModal ? (
                <div className="text-black">
                  <form
                    className="flex flex-col px-5"
                    onSubmit={(e: SyntheticEvent) => {
                      e.preventDefault();
                      const userData = Object.fromEntries(
                        new FormData(e.target as HTMLFormElement)
                      );
                      saveUser({ ...userData, id: user.id });
                    }}
                  >
                    <label htmlFor="updateName" className="text-xs">
                      Name
                    </label>
                    <input
                      className="px-3 py-2 my-1 bg-gray-200 rounded-sm border-black"
                      name="name"
                      id="updateName"
                      type="text"
                      defaultValue={user.name}
                    />
                    <label htmlFor="updateEmail" className="text-xs">
                      Email
                    </label>
                    <input
                      className="px-3 py-2 my-1 bg-gray-200 rounded-sm border-black"
                      name="email"
                      type="email"
                      defaultValue={user.email}
                      id="updateEmail"
                    />
                    <label htmlFor="updatePassword" className="text-xs">
                      Password
                    </label>
                    <input
                      className="px-3 py-2 my-1 bg-gray-200 rounded-sm border-black"
                      name="password"
                      type="password"
                      id="updatePassword"
                      defaultValue="OLDPASSWORD"
                    />
                    <input
                      type="Submit"
                      value="Update"
                      onChange={() => {}}
                      className="self-end p-2 my-3 w-24 text-gray-200 bg-gray-900 rounded-lg cursor-pointer hover:bg-black hover:text-white"
                    />
                  </form>
                </div>
              ) : null}
              {user.role === "ADMIN" ? (
                <>
                  <hr />
                  <div className="mt-4 w-full">
                    <h3 className="px-6 font-medium text-left text-gray-900">
                      All Users
                    </h3>
                    <div className="flex flex-col items-center px-4 mt-5 w-full text-sm text-black">
                      <table className="min-w-full table-fixed">
                        <thead>
                          <tr>
                            <th className="px-2 py-3 w-1/3 min-w-36">Name</th>
                            <th className="px-2 py-3 w-2/3 min-w-48">Email</th>
                            <th className="px-2 py-3 w-16">Role</th>
                            <th className="px-2 py-3 w-32">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {Object.keys(users).map((_userId) => {
                            return (
                              <tr key={_userId} className="h-10">
                                <td className="px-2">
                                  <input
                                    value={users[_userId].name}
                                    type="text"
                                    className="px-3 py-2 my-1 w-full bg-gray-200 rounded-sm border-black"
                                    onChange={(e: any) =>
                                      setUsers((_users) => ({
                                        ..._users,
                                        [_userId]: {
                                          ..._users[_userId],
                                          name: e.target.value,
                                        },
                                      }))
                                    }
                                  />
                                </td>
                                <td className="px-2">
                                  <input
                                    value={users[_userId].email}
                                    type="email"
                                    className="px-3 py-2 my-1 w-full bg-gray-200 rounded-sm border-black"
                                    onChange={(e: any) =>
                                      setUsers((_users) => ({
                                        ..._users,
                                        [_userId]: {
                                          ..._users[_userId],
                                          email: e.target.value,
                                        },
                                      }))
                                    }
                                  />
                                </td>
                                <td className="px-2">
                                  <select
                                    value={users[_userId].role}
                                    className="px-3 py-2 my-1 bg-gray-200 rounded-sm border-black"
                                    onChange={(e: any) =>
                                      setUsers((_users) => ({
                                        ..._users,
                                        [_userId]: {
                                          ..._users[_userId],
                                          role: e.target.value,
                                        },
                                      }))
                                    }
                                  >
                                    <option value="ADMIN">Admin</option>
                                    <option value="USER">User</option>
                                  </select>
                                </td>
                                <td className="px-2">
                                  <div className="flex justify-evenly items-center text-lg">
                                    <FiSave
                                      className="transition-all cursor-pointer hover:scale-125"
                                      title="Save User"
                                      onClick={() =>
                                        saveUser({
                                          id: _userId,
                                          name: users[_userId].name,
                                          email: users[_userId].email,
                                          role: users[_userId].role,
                                          password: "OLDPASSWORD",
                                        })
                                      }
                                    />
                                    <AiOutlineDelete
                                      title="Delete User"
                                      onClick={() => setDeleteModal(true)}
                                      className="transition-all cursor-pointer hover:scale-125"
                                    />
                                    <GrPowerReset
                                      title="Reset Password"
                                      className="transition-all cursor-pointer hover:scale-125"
                                      onClick={() => resetUser(_userId)}
                                    />
                                    <div className="text-white">
                                      {deleteModal ? (
                                        <ConfirmationModal
                                          onConfirm={() => {
                                            deleteUser(_userId);
                                            setDeleteModal(false);
                                          }}
                                          onReject={() => setDeleteModal(false)}
                                          message="Are you sure you want to delete this user?"
                                        />
                                      ) : null}
                                    </div>
                                  </div>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                      <div>
                        <button
                          onClick={addUser}
                          className="p-2 my-3 w-24 text-gray-200 bg-gray-900 rounded-lg cursor-pointer ms-auto hover:bg-black hover:text-white"
                        >
                          Add User
                        </button>
                      </div>
                    </div>
                  </div>
                </>
              ) : null}
            </div>
          </div>
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

  let allUsers: any = {};
  if (user.role === "ADMIN") {
    const userList = await prisma.user.findMany({ where: { id: { not: 1 } } });
    for (const _user of userList) {
      allUsers[_user.id] = { ..._user, id: null };
    }
  }
  console.log(allUsers);

  return { props: { user, allUsers } };
};

export default Profile;
