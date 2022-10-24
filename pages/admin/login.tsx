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
    <div className="flex flex-col justify-center items-center w-screen h-screen font-sans bg-dark">
      <form
        onSubmit={formSubmit}
        className="px-8 py-6 w-5/6 max-w-sm bg-gray-800 rounded"
      >
        <div className="mb-4">
          <Input name="Email" type="email" placeholder="Enter email" />
        </div>
        <div className="mb-4">
          <div className="mb-4">
            <Input
              name="Password"
              type="password"
              placeholder="Enter password"
            />
          </div>
        </div>
        <button className="block px-10 py-2 mx-auto mt-8 font-bold text-white bg-blue-700 rounded text-md">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
