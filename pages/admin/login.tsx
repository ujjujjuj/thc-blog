import { SyntheticEvent, useId } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Router from "next/router";
import Input from "../../components/Input";

const Login = () => {
  const emailId = useId();
  const passwordId = useId();

  const formSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.target as HTMLFormElement));
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
    // <div className="flex flex-col justify-center items-center w-screen h-screen font-sans bg-dark">
    //   <form
    //     onSubmit={formSubmit}
    //     className="px-8 py-6 w-5/6 max-w-sm bg-gray-800 rounded"
    //   >
    //     <div className="mb-4">
    //       <Input name="Email" type="email" placeholder="Enter email" />
    //     </div>
    //     <div className="mb-4">
    //       <div className="mb-4">
    //         <Input
    //           name="Password"
    //           type="password"
    //           placeholder="Enter password"
    //         />
    //       </div>
    //     </div>
    //     <button className="block px-10 py-2 mx-auto mt-8 font-bold text-white bg-blue-700 rounded text-md">
    //       Login
    //     </button>
    //   </form>
    // </div>

    <div className="container px-6 mx-auto">
      <div className="flex flex-col text-center md:text-left md:flex-row h-screen justify-evenly md:items-center">
        <div className="flex flex-col w-full">
          <p className="font-logo text-6xl md:text-8xl">THC</p>
          <h3 className="font-poppins mx-6  text-3xl">Admin Portal</h3>
        </div>
        <div className="w-full md:w-full lg:w-9/12 mx-auto md:mx-0">
          <div className="bg-white p-10 flex flex-col w-full shadow-xl rounded-xl">
            <h2 className="text-3xl font-poppins font-bold text-gray-800 text-left mb-5">
              Sigin
            </h2>
            <form action="post" className="w-full" onSubmit={formSubmit}>
              <div id="input" className="flex flex-col w-full my-5">
                <label className="text-gray-500 mb-2">Email</label>
                <input
                  name="email"
                  type="email"
                  placeholder="Please insert your password"
                  className="appearance-none border-2 text-black border-gray-100 rounded-lg px-4 py-3 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-green-600 focus:shadow-lg"
                />
              </div>
              <div id="input" className="flex flex-col w-full my-5">
                <label className="text-gray-500 mb-2">Password</label>
                <input
                  name="password"
                  type="password"
                  id="password"
                  placeholder="Please insert your password"
                  className="appearance-none border-2 text-black border-gray-100 rounded-lg px-4 py-3 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-green-600 focus:shadow-lg "
                />
              </div>
              {/* <div id="button" className="flex flex-col w-full my-5"> */}
              <button
                type="submit"
                className="w-full py-4 bg-green-600 rounded-lg text-green-100 hover:bg-green-500 ease-in duration-100"
              >
                <div className="flex flex-row items-center justify-center">
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
              {/* </div> */}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
