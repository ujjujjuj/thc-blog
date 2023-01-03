import { SyntheticEvent } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Router from "next/router";
import { BiLogIn } from "react-icons/bi";
import Head from "next/head";

const Login = () => {
  const formSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    const data: any = Object.fromEntries(
      new FormData(e.target as HTMLFormElement)
    );
    if (data.email.length === 0 || data.password.length === 0) {
      return toast.error("Please enter your Email and Password");
    }
    axios
      .post("/api/auth/login", data)
      .then(() => {
        Router.push("/admin");
      })
      .catch((e) => {
        if (e.response.status === 401) {
          toast.error("Invalid credentials provided");
        } else {
          toast.error("Server error");
          console.log(e);
        }
      });
  };

  return (
    <>
      <Head>
        <title>Admin Login</title>
      </Head>
      <div className="mx-auto w-11/12">
        <div className="flex flex-col justify-center items-center h-screen">
          <div className="flex flex-col items-center p-10 w-full max-w-md bg-white rounded-xl shadow-xl">
            <div>
              <span className="mb-5 text-3xl font-bold text-gray-800 font-poppins">
                thc admin
              </span>
            </div>
            <form action="post" className="w-full" onSubmit={formSubmit}>
              <div id="input" className="flex flex-col my-5 w-full">
                <label className="mb-2 text-gray-500">Email</label>
                <input
                  name="email"
                  type="email"
                  placeholder="Please insert your password"
                  className="px-4 py-3 placeholder-gray-300 text-black rounded-lg border-2 border-gray-100 appearance-none focus:outline-none focus:ring-2 focus:ring-green-600 focus:shadow-lg"
                />
              </div>
              <div id="input" className="flex flex-col my-5 w-full">
                <label className="mb-2 text-gray-500">Password</label>
                <input
                  name="password"
                  type="password"
                  id="password"
                  placeholder="Please insert your password"
                  className="px-4 py-3 placeholder-gray-300 text-black rounded-lg border-2 border-gray-100 appearance-none focus:outline-none focus:ring-2 focus:ring-green-600 focus:shadow-lg"
                />
              </div>
              <button
                type="submit"
                className="py-4 w-full text-green-100 bg-green-600 rounded-lg duration-100 ease-in hover:bg-green-500"
              >
                <div className="flex flex-row justify-center items-center">
                  <div className="mr-2">
                    <BiLogIn />
                  </div>
                  <div className="font-bold">Sign In</div>
                </div>
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
