import { SyntheticEvent, useId } from "react";
import axios, { GenericHTMLFormElement } from "axios";
import { toast } from "react-toastify";
import Router from "next/router";
import Input from "../../components/Input";

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
            {/* <div id="button" className="flex flex-col my-5 w-full"> */}
            <button
              type="submit"
              className="py-4 w-full text-green-100 bg-green-600 rounded-lg duration-100 ease-in hover:bg-green-500"
            >
              <div className="flex flex-row justify-center items-center">
                <div className="mr-2">
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                    ></path>
                  </svg>
                </div>
                <div className="font-bold">Sigin</div>
              </div>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
